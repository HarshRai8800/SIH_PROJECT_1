import { db } from "../prismaClient/prisma.js";
import {inngest} from "../inngest/client.js"

export const createTicket = async(req,res)=>{

    const {clerkId} = req.body
    const user = await db.user.findUnique({
        where:{clerkId:clerkId}
    })
    if(!user){
        return res.status(403).send("Forbidden");
    }
   try {
    const {mode,discription,meetingLocation,timing,conserns,level,severityOfCase,counsellerType} = req.body;
    const date = new Date(timing); 
    if(mode=="offline"&&!meetingLocation){
     return res.status(401).json({error:"Meeting location not mentioned"});
    }
 
    const ticket = await db.ticket.create({
     data:{
         studentId:user?.id,
        discription,     
        level :level,  
        meetingLocation,   
        timing:date.toISOString(),  
        consern :conserns,
        severity :severityOfCase,
        counsellerType:counsellerType?counsellerType:null
     }
    })
    console.log(ticket)
    if(!ticket){
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
        
   




