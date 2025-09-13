import { db } from "../prismaClient/prisma.js";



export const getUser = async(req,res)=>{
      if (!req.auth || !req.auth.userId) {
    return res.status(401).send("Unauthorized");
  }

  try {
    const { clerkId } = req.query;
    console.log(clerkId );
    const user = await db.user.findUnique({
        where:{clerkId}
    });
    if(!user){
        return res.status(401).send("user not found");
    }
    return res.status(201).json({user})
}
    catch(err){
        console.log(err.message)
        return res.status(500).json({message:"internal server error"})
    }
}