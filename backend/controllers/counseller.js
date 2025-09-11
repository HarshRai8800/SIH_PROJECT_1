import { db } from "../prismaClient/prisma.js";



export const registerCounseller = async(req,res)=>{
       if (!req.auth || !req.auth.userId) {
    return res.status(401).send("Unauthorized");
  }

  const clerkId = req.auth.userId;
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
try{


     const counseller = await db.counseller.create({
        data:{
            clerkId,
            email,
            firstName,
            lastName,
            imageUrl
        }
    })

    if(!counseller){
        return res.status(401).json({message:"user can not be created"})
    }

    return res.status(201).json({message:"counseller has been created"})

} catch (error) {
    console.log(error)
        return res.status(501).json({message:"Internal server error "})
  }

}




export const updateCounseller  = async(req,res)=>{
     if (!req.auth || !req.auth.userId) {
    return res.status(401).send("Unauthorized");
  }

  try {
    const counseller = await db.counseller.findUnique({where:{clerkId}});
    if(counseller){
        return res.status(401).send("counseller not found");
    }

    const data = req.body;

    const updateData = {};
    if (data.firstName !== undefined) updateData.firstName = data.firstName;
    if (data.lastName !== undefined) updateData.lastName = data.lastName;
    if (data.email !== undefined) updateData.email = data.email;
    if (data.imageUrl !== undefined) updateData.imageUrl = data.imageUrl;
    if (data.bio !== undefined) updateData.bio = data.bio;
    if (data.relatedSkills !== undefined) updateData.relatedSkills = data.relatedSkills;
    if (data.speciality !== undefined) updateData.speciality = data.speciality;
    if (data.languages !== undefined) updateData.languages = data.languages;

    // If ratings are updated, also recalc average
    if (data.allRatings !== undefined) {
      updateData.allRatings = data.allRatings;
      if (data.allRatings.length > 0) {
        const sum = data.allRatings.reduce((a, b) => a + b, 0);
        updateData.averageRating = sum / data.allRatings.length;
      } else {
        updateData.averageRating = null; // No ratings yet
      }
    }

    const updatedCounsellor = await db.counseller.update({
      where: { id: Number(id) },
      data: updateData,
    });

    return res.json(updatedCounsellor);





  } catch (error) {
    console.log(error.message)
    return res.status(500).json({message:"internal server error"})

  }
}


export const getCounseller = async(req,res)=>{
      if (!req.auth || !req.auth.userId) {
    return res.status(401).send("Unauthorized");
  }

  try {

    const counseller = await db.counseller.findUnique({where:{clerkId}});
    if(counseller){
        return res.status(401).send("counseller not found");
    }
    return res.status(201).json({counseller})
}
    catch(err){
        console.log(err.message)
        return res.status(500).json({message:"internal server error"})
    }
}