import { db } from "../prismaClient/prisma.js";

export const createTicket = async(req,res)=>{

    const {clerkId} = req.body
    const user = await db.students.findUnique({

        where:{clerkId:clerkId}
    })
    if(!user){
        return res.status(403).send("Forbidden");
    }
   try {
    const {mode,discription,meetingLocation,timing,conserns,level,severityOfCase,counsellorId} = req.body;

    const date = new Date(timing); 
    if(mode=="offline"&&!meetingLocation){
     return res.status(401).json({error:"Meeting location not mentioned"});
    }

   const now = new Date();

const check = await db.ticket.findFirst({
  where: {
    studentId: user?.id,
    counsellorId: counsellorId || null,
    timing: {
      gt: now, // strictly in the future
    },
  },
});
    if(check){
        return res.status(404).json({message:"ticket already exists try after counselling "})
    }
 
    const ticket = await db.ticket.create({
     data:{
        studentId:user?.id,
        description:discription,     
        level :level,  
        meetingLocation,   
        timing:date.toISOString(),  
        concern :conserns,
        severity :severityOfCase,
        counsellorId:counsellorId?counsellorId:null
     },
     include: {
    counsellor: true, 
  },
    })
    if(!ticket){
        return res.status(406).json({error:"Ticket can not be created correpted data"});
    }
    res.status(201).json(ticket)



   } catch (error) {
     return res.status(500).json({error:"Internal server error"});
   }

}

export const getTickets = async(req,res)=>{

try {
  const {clerkId} = req?.body
  console.log(clerkId+"hii")
  const now = new Date();
 const upcomingTickets = await db.ticket.findMany({
  where: {
     student: {
      clerkId: clerkId, // filter tickets for this student
    },
    timing: {
      gte: now, 
    },
  },
  orderBy: {
    timing: 'asc', 
  },
  take: 6, 
  include: {
    student: true,
    counsellor: true,
  },
});
console.log(upcomingTickets)
if(!upcomingTickets){
  return res.status(202).json({message:"no upcoming tickets found "})
}

return res.status(200).json(upcomingTickets)
} catch (error) {
  console.log(error.message)
  return res.status(500).json({message:"the tickets are not found "})
}

}

export const getCounsellorTickets = async(req,res)=>{
  try {
    if(!req.auth||!req.auth.userId){
      return res.status(400).json({message:"Authorization token not found"})
    }

    const clerkId = req.auth.userId

    const counsellor = await db.counsellor.findUnique({
      where:{
        clerkId:clerkId
      }
    })
    if(!counsellor){
      return res.status(404).json({message:"clerkId not found in database"})
    }
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000); // 1 hour ago

const tickets = await db.ticket.findMany({
  where: {
    counsellorId: counsellor.id,
    timing: {
      gt: oneHourAgo,
    },
  },
  orderBy: {
    timing: "asc",
  },
  take: 12, 
});

const totalCount = await db.ticket.count({
  where: {
    counsellorId: counsellor.id,
    timing: {
      gt: oneHourAgo,
    },
  },
});

    return res.status(200).json({tickets,totalCount})

  } catch (error) {
      console.log(error.message)
      return res.status(404).json({message:error.message})
  }
}

export const getTodayCounsellorTickets = async (req, res) => {
  try {
    if (!req.auth || !req.auth.userId) {
      return res.status(400).json({ message: "Authorization token not found" });
    }

    const clerkId = req.auth.userId;

    const counsellor = await db.counsellor.findUnique({
      where: { clerkId },
    });

    if (!counsellor) {
      return res.status(404).json({ message: "clerkId not found in database" });
    }

    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000); // current - 1 hour
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999); // end of today

    const tickets = await db.ticket.findMany({
      where: {
        counsellorId: counsellor.id,
        timing: {
          gt: oneHourAgo,
          lte: endOfDay,
        },
      },
      orderBy: { timing: "asc" },
    });

    const totalCount = await db.ticket.count({
      where: {
        counsellorId: counsellor.id,
        timing: {
          gt: oneHourAgo,
          lte: endOfDay,
        },
      },
    });

    return res.status(200).json({ tickets, totalCount });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const getPastCounsellorTickets = async (req, res) => {
  try {
    if (!req.auth || !req.auth.userId) {
      return res.status(400).json({ message: "Authorization token not found" });
    }

    const clerkId = req.auth.userId;

    const counsellor = await db.counsellor.findUnique({
      where: { clerkId },
    });

    if (!counsellor) {
      return res.status(404).json({ message: "clerkId not found in database" });
    }

    const now = new Date();

    const tickets = await db.ticket.findMany({
      where: {
        counsellorId: counsellor.id,
        timing: {
          lt: now, // strictly before now
        },
      },
      orderBy: { timing: "desc" }, // latest past first
    });

    const totalCount = await db.ticket.count({
      where: {
        counsellorId: counsellor.id,
        timing: {
          lt: now,
        },
      },
    });

    return res.status(200).json({ tickets, totalCount });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};


   




