import {inngest} from "../client"
import { db } from "../../prismaClient/prisma";
import { NonRetriableError } from "inngest";
import analyzeTicket from "../../utils/ai";


export const ticket_agent = inngest.createFunction(
    {id:on-ticket-created,retries:2},
    {event:"ticket/created"},
    async({event,step})=>{

        try{
            const {ticketId} = event.data;
            const ticket = await step.run("fetch-ticket",async()=>{
                const ticketObject = await db.ticket.findUnique(
                    {where: {id:ticketId}
                    })

                    if(!ticketObject){
                        throw new NonRetriableError("Ticket not found");
                    }
                    return ticketObject;
            })

            const airesponse = await analyzeTicket(ticket)

            const relatedSkills = await step.run("ai-proccessing",async()=>{
                let helpfulNotes=[]
                if(airesponse){
                    await db.ticket.update({
                        where:{id:ticketId},
                        data:{
                            severity:!["GENERAL","MEDIUM","EMERGENCY"].includes(airesponse.severity)?"medium":airesponse.severity,
                            description:airesponse.description?airesponse.description:ticketObject.description,
                            status:"IN_PROGRESS",
                            counsellerType:["GENERAL_COUNSELOR","ACADEMIC_COUNSELOR","PSYCHIATRIST","PEER_SUPPORT_VOLUNTEER"].includes(airesponse.counsellerType)?airesponse.counsellerType:"GENERAL_COUNSELOR",
                        }
                    })
                     helpfulNotes=airesponse.helpfulNotes
                }
            })
                
if(ticket.level="SPECIALASKING"||ticket.level=="EMERGENCY"){

  const bestCounseller =   await step.run("assign-counseller",async()=>{
         const counsellors = await db.counseller.findMany({
      include: {
        assignedUser: true,
      },
    });

    if (!counsellors.length) {
      throw new NonRetriableError("No counsellors available");
    }

    // 4. Compute best counsellor
    const bestCounsellor = counsellors
      .map(c => {
        // Count how many skills from ticket match counsellor's relatedSkills
        const matchingSkills = (airesponse.relatedSkills || []).filter(skill =>
          c.relatedSkills.includes(skill)
        ).length;

        return {
          ...c,
          matchingSkills,
          assignedCount: c.assignedUser.length,
        };
      })
      .sort((a, b) => {
        // Sort first by highest matches, then by lowest assigned count
        if (b.matchingSkills !== a.matchingSkills) {
          return b.matchingSkills - a.matchingSkills;
        }
        return a.assignedCount - b.assignedCount;
      })[0];

    if (!bestCounsellor) {
      throw new NonRetriableError("No suitable counsellor found");
    }

    // 5. Update ticket with counsellor
    const updatedTicket = await db.ticket.update({
      where: { ticketId },
      data: {
        counsellerI:bestCounsellor.id}
    });
    })

        await step.run("send-email-notification",async ()=>{
            const finalTicket = await db.ticket.findUnique({
  where: { id: ticket.id },
  include: {
    counseller: true,  // populates the related Counsellor object
  },
});

// Now you can access finalTicket.counseller.email, etc.
await sendMail(
  finalTicket.counseller.email,
  "Ticket Assigned",
  `A new ticket has been assigned to you.
Name :${finalTicket.firstname +" "+ finalTicket.lastname}
Description: ${finalTicket.description}
Priority: ${finalTicket.severity}
Timing : ${finalTicket.timing}

Please check the dashboard for more details.`
);
                })

}
 return bestCounsellor;
        }catch(error){
                console.log(error.message);
        }
    }
)