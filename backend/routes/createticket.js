import express from 'express'
import { requireAuth } from "@clerk/express";
import {createTicket,getTickets,getCounsellorTickets,getTodayCounsellorTickets,getPastCounsellorTickets }from "../controllers/ticket.js"

const router  = express.Router();

router.post("/create_ticket",requireAuth(),createTicket)
router.post("/get_upcoming_tickets",requireAuth(),getTickets)
router.post("/get_counsellor_tickets",requireAuth(),getCounsellorTickets)
router.post("/get_counsellor_todaysTicket",requireAuth(),getTodayCounsellorTickets)
router.post("/get_counsellor_pastTickets",requireAuth(),getPastCounsellorTickets)

export default router;
