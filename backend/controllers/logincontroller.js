import { clerkClient } from "@clerk/express";
import { db } from "../prismaClient/prisma.js";


export const registerUser = async (req, res) => {
  if (!req.auth || !req.auth.userId) {
    return res.status(401).send("Unauthorized");
  }

  const clerkId = req.auth.userId;
  const incomingRole = (req.body?.role || "").toString().toLowerCase();

  console.log(incomingRole)

  try {

    const clerkUser = await clerkClient.users.getUser(clerkId);
    const primaryEmailId = clerkUser?.primaryEmailAddressId;
    const primaryEmailObj = clerkUser?.emailAddresses?.find((e) => e.id === primaryEmailId) || clerkUser?.emailAddresses?.[0];
    const email = primaryEmailObj?.emailAddress;
    const firstName = clerkUser?.firstName || null;
    const lastName = clerkUser?.lastName || null;
    const imageUrl = clerkUser?.imageUrl || null;

    if (!email) {
      return res.status(400).json({ error: "Unable to resolve user email from Clerk" });
    }

    // Route to proper table based on role (default to student)
    if (incomingRole === "counsellor") {
      const counsellor = await db.counsellor.upsert({
        where: { clerkId },
        update: {
          email,
          firstName: firstName || "",
          lastName: lastName || "",
          imageUrl: imageUrl || "",
        },
        create: {
          clerkId,
          email,
          firstName: firstName || "",
          lastName: lastName || "",
          imageUrl: imageUrl || "",
          // required array fields – initialize empty
          relatedSkills: [],
          speciality: [],
          languages: [],
          allRatings: [],
        },
      });
      return res.json({ role: "counsellor", data: counsellor });
    }

    // Student (default)
    const user = await db.user.upsert({
      where: { clerkId },
      update: {
        email,
        firstName,
        lastName,
        imageUrl,
      },
      create: {
        clerkId,
        email,
        firstName,
        lastName,
        imageUrl,
        languages: [],
      },
    });

    return res.json({ role: "student", data: user });
  } catch (err) {
    console.log(err.message)
    return res.status(500).json({ error: err.message });
  }
};


