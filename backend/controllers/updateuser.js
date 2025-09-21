import { db } from "../prismaClient/prisma.js";


export const updateUser = async(req,res)=>{
     if (!req.auth || !req.auth.userId) {
    return res.status(401).send("Unauthorized");
  }

  const {clerkId} = req.body;

   const student = await db.students.findUnique({
      where: { clerkId },
    });

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
  try {
    const {
      firstName,
      lastName,
      imageUrl,
      languages,
    } = req.body;

    const updateData = {};

    if (firstName !== undefined) updateData.firstName = firstName;
    if (lastName !== undefined) updateData.lastName = lastName;
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl;
    if (languages !== undefined) updateData.languages = languages;

        const updatedStudent = await db.students.update({
        where: { clerkId },
        data: updateData,
        });
    
        if(updatedStudent!==null){
                    return res.status(200).json(updatedStudent);
        }

        return res.status(400).json({errro:"Student cannot be updated"})
  } catch (error) {
    res.status(500).json({error: error.message});
  }

}

