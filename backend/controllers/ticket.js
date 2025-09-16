import { db } from "../prismaClient/prisma.js";


export const createTicket = async(req,res)=>{
    if(!req.auth||!req.auth.userId){
   return res.status(401).send("Unauthorized");
    }

    const {clerkId} = req.auth.userId;

    const user = await db.user.findUnique({
        where:{id:clerkId}
    })
    if(!user){
        return res.status(403).send("Forbidden");
    }
   try {
    const {mode,discription,meetingLocation,timing,conserns,severityOfCase,counsellerType} = req.body;
 
    if(mode=="offline"&&!meetingLocation){
     return res.status(401).json({error:"Meeting location not mentioned"});
    }
 
    const ticket = await db.ticket.create({
     data:{
         studentId:user?.id,
        discription,     
        level :severityOfCase,  
        meetingLocation,   
        timing,  
        consern :conserns,
        severity :severityOfCase,
        counsellerType:counsellerType?counsellerType:null
     }
    })
    if(ticket){
        return res.status(401).json({error:"Ticket can not be created correpted data"});
    }

    await inngest.send({
        name:"ticket/created",
        data:{
            ticketId:ticket.id
        }
    })

    res.status(201).json({message:"ticket has been created and assigned succesfully"})



   } catch (error) {
    console.log(error.message);
     return res.status(500).json({error:"Internal server error"});
   }

}
        
   




