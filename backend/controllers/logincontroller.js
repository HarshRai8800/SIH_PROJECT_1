import { clerkClient } from "@clerk/express";
import { db } from "../prismaClient/prisma.js";


export const registerUser = async (req, res) => {
  if (!req.auth || !req.auth.userId) {
    return res.status(401).send("Unauthorized");
  }

  const clerkId = req.auth.userId;

  try {
    const { role: roleFromBody } = req.body || {};

    // Fetch user profile from Clerk
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

    const role = roleFromBody || "STUDENT"; // default to STUDENT if not provided

    const user = await db.user.upsert({
      where: { clerkId },
      update: {
        email,
        firstName,
        lastName,
        imageUrl,
        role,
      },
      create: {
        clerkId,
        email,
        firstName,
        lastName,
        imageUrl,
        role,
      },
    });

    return res.json(user);
  } catch (err) {
    console.log(err.message)
    return res.status(500).json({ error: err.message });
  }
};


