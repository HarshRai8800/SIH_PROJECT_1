export const ticket_agent = inngest.createFunction(
  { id: "on-ticket-created", retries: 2 },
  { event: "ticket/created" },
  async ({ event, step }) => {
    try {
      const { ticketId } = event.data;

      const ticketObject = await step.run("fetch-ticket", async () => {
        const t = await db.ticket.findUnique({ where: { id: ticketId } });
        if (!t) throw new NonRetriableError("Ticket not found");
        return t;
      });

      const airesponse = await analyzeTicket(ticketObject);

      await step.run("ai-processing", async () => {
        if (airesponse) {
          await db.ticket.update({
            where: { id: ticketId },
            data: {
              severity: !["GENERAL", "MEDIUM", "EMERGENCY"].includes(airesponse.severity)
                ? "MEDIUM"
                : airesponse.severity,
              description: airesponse.description || ticketObject.description,
              status: "IN_PROGRESS",
              counsellerType: ["GENERAL_COUNSELOR", "ACADEMIC_COUNSELOR", "PSYCHIATRIST", "PEER_SUPPORT_VOLUNTEER"].includes(airesponse.counsellerType)
                ? airesponse.counsellerType
                : "GENERAL_COUNSELOR",
              helpfulNotes: airesponse.helpfulNotes || [],
            },
          });
        }
      });

      let bestCounsellor = null;

      if (ticketObject.level === "SPECIALASKING" || ticketObject.level === "EMERGENCY") {
        bestCounsellor = await step.run("assign-counsellor", async () => {
          const counsellors = await db.counseller.findMany({
            include: { assignedUser: true },
          });

          if (!counsellors.length) {
            throw new NonRetriableError("No counsellors available");
          }

          return counsellors
            .map((c) => {
              const matchingSkills = (airesponse.relatedSkills || []).filter((skill) =>
                c.relatedSkills.includes(skill)
              ).length;

              return {
                ...c,
                matchingSkills,
                assignedCount: c.assignedUser.length,
              };
            })
            .sort((a, b) => {
              if (b.matchingSkills !== a.matchingSkills) {
                return b.matchingSkills - a.matchingSkills;
              }
              return a.assignedCount - b.assignedCount;
            })[0];
        });

        if (!bestCounsellor) throw new NonRetriableError("No suitable counsellor found");

        await db.ticket.update({
          where: { id: ticketId },
          data: { counsellerId: bestCounsellor.id },
        });

        await step.run("send-email-notification", async () => {
          const finalTicket = await db.ticket.findUnique({
            where: { id: ticketId },
            include: { counseller: true },
          });

          await sendMail(
            finalTicket.counseller.email,
            "Ticket Assigned",
            `A new ticket has been assigned to you.
Name: ${finalTicket.firstname} ${finalTicket.lastname}
Description: ${finalTicket.description}
Priority: ${finalTicket.severity}
Timing: ${finalTicket.timing}`
          );
        });
      }

      return bestCounsellor;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }
);
