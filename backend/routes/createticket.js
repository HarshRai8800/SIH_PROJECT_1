import express from 'express'
import { requireAuth } from "@clerk/express";
import {createTicket }from "../controllers/ticket.js"

const router  = express.Router();

router.post("/create_ticket",requireAuth(),createTicket)

export default router;
