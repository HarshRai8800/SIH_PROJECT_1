import express from 'express'
import { requireAuth } from "@clerk/express";
import {createTicket,getTickets }from "../controllers/ticket.js"

const router  = express.Router();

router.post("/create_ticket",requireAuth(),createTicket)
router.post("/get_upcoming_tickets",requireAuth(),getTickets)
export default router;
