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
    const {counsellerId} = req.body;

    if(level=="SPECIALASKING"&&!counsellerId){
        return res.status(400).send("CounsellerId is required for special asking level");
    }
    try {
        if(level=="SPECIALASKING"){
            const ticket = await db.ticket.create({
            data:{
                status,
                issue,
                level,
                studentId:user.id,
                counsellorId:counsellerId||null
            }
        })
        if(ticket){
                return res.status(201).json(ticket);
            }else{
                return res.status(500).send("Something went wrong");
            }
        }


        
    } catch (error) {
        
    }




}
