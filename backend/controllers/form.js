import { db } from "../prismaClient/prisma";


export const updatedForm = async (req, res) => {
  try {

    if (!req.auth || !req.auth.userId) {
      return res.status(401).send("Unauthorized");
    }

    const clerkId = req.auth.userId;

    const user = await db.user.findUnique({
      where: { clerkId },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const {
      responses,
      phq9Score,
      gad7Score,
      ghq12Score,
      interpretation,
    } = req.body || {};

    const updateData = {};
    if (responses !== undefined) updateData.responses = responses;
    if (phq9Score !== undefined) updateData.phq9Score = phq9Score;
    if (gad7Score !== undefined) updateData.gad7Score = gad7Score;
    if (ghq12Score !== undefined) updateData.ghq12Score = ghq12Score;
    if (interpretation !== undefined) updateData.interpretation = interpretation;

    const updatedTest = await db.testResult.updateMany({
      where: { userId: user.id },
      data: updateData,
    });

    return res.json({updatedTest });
  } catch (error) {
    console.error("Error updating test form:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};