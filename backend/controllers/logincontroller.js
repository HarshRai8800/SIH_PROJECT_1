import { clerkClient } from "@clerk/express";
import { db } from "../prismaClient/prisma.js";


export const registerUser = async (req, res) => {
  console.log("=== REGISTER USER REQUEST ===");
  console.log("Auth object:", req.auth);
  console.log("Request body:", req.body);
  
  if (!req.auth || !req.auth.userId) {
    console.log("ERROR: No auth or userId found");
    return res.status(401).send("Unauthorized");
  }

  const clerkId = req.auth.userId;
  const incomingRole = (req.body?.role || "").toString().toLowerCase();

  console.log("Clerk ID:", clerkId);
  console.log("Incoming role:", incomingRole);

  try {
    console.log("Fetching user from Clerk...");
    const clerkUser = await clerkClient.users.getUser(clerkId);
    console.log("Clerk user data:", {
      id: clerkUser?.id,
      firstName: clerkUser?.firstName,
      lastName: clerkUser?.lastName,
      emailAddresses: clerkUser?.emailAddresses?.length
    });
    
    const primaryEmailId = clerkUser?.primaryEmailAddressId;
    const primaryEmailObj = clerkUser?.emailAddresses?.find((e) => e.id === primaryEmailId) || clerkUser?.emailAddresses?.[0];
    const email = primaryEmailObj?.emailAddress;
    const firstName = clerkUser?.firstName || null;
    const lastName = clerkUser?.lastName || null;
    const imageUrl = clerkUser?.imageUrl || null;

    console.log("Extracted user data:", { email, firstName, lastName, imageUrl });

    if (!email) {
      console.log("ERROR: No email found for user");
      return res.status(400).json({ error: "Unable to resolve user email from Clerk" });
    }

    // Route to proper table based on role (default to student)
    if (incomingRole === "counsellor") {
      console.log("Creating/updating counsellor...");
      const counsellor = await db.counsellor.upsert({
        where: { email },
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
      console.log("Counsellor created/updated:", counsellor);
      return res.json({ role: "counsellor", data: counsellor });
    }

    // Student (default)
    console.log("Creating/updating student...");
    const user = await db.user.upsert({
      where: { email },
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

    console.log("User created/updated:", user);
    return res.json({ role: "student", data: user });
  } catch (err) {
    console.error("ERROR in registerUser:", err);
    console.error("Error details:", {
      message: err.message,
      stack: err.stack,
      name: err.name
    });
    return res.status(500).json({ error: err.message });
  }
};


