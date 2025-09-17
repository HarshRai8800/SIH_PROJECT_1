import { db } from "../prismaClient/prisma.js";



export const getUser = async(req,res)=>{
      if (!req.auth || !req.auth.userId) {
    return res.status(401).send("Unauthorized");
  }

  try {
    const { clerkId } = req.query;
    const student = await db.students.findUnique({
      where: { clerkId },
      include: {
        ticketsAsStudent: true,
        testResults: true,    
      },
    });
    if(!student){
        return res.status(401).send("student not found");
    }
    return res.status(201).json({student})
}
    catch(err){
        console.log(err.message)
        return res.status(500).json({message:"internal server error"})
    }
}