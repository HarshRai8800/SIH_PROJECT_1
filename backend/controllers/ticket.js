import { db } from "../prismaClient/prisma.js";
import {inngest} from "../inngest/client.js"

export const createTicket = async(req,res)=>{

    const {clerkId} = req.body
    const student = await db.students.findUnique({
        where:{clerkId:clerkId}
    })
    if(!student){
        return res.status(403).send("Forbidden");
    }
   try {
    const {mode,description,meetingLocation,timing,conserns,level,severityOfCase,counsellorType,phoneNumber} = req.body;
    const date = new Date(timing); 
    if(mode=="offline"&&!meetingLocation){
     return res.status(401).json({error:"Meeting location not mentioned"});
    }
 
    const ticket = await db.ticket.create({
     data:{
        studentId:student?.id,
        description: description,
        level :level,
        meetingLocation,
        timing:date.toISOString(),
        concern :conserns,
        severity :severityOfCase,
        counsellorType: counsellorType ? counsellorType : null,
        phoneNumber: phoneNumber || null
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
        
   




