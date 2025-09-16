import { db } from "../prismaClient/prisma.js";


export const updateUser = async(req,res)=>{
     if (!req.auth || !req.auth.userId) {
    return res.status(401).send("Unauthorized");
  }

  const {clerkId} = req.body;

   const user = await db.user.findUnique({
      where: { clerkId },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
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

        const updatedUser = await db.user.update({
        where: { clerkId },
        data: updateData,
        });
    
        if(updatedUser!==null){
                    return res.status(200).json(updatedUser);
        }

        return res.status(400).json({errro:"User cannot be updated"})
  } catch (error) {
    res.status(500).json({error: error.message});
    console.log(error.message)
  }

}

