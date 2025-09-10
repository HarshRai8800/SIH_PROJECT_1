import express from "express"
import {registerCounseller,updateCounseller,getCounseller} from "../controllers/counseller"
import { requireAuth } from "@clerk/express";
 
const router = express.Router()



router.post("/registerUser",requireAuth,registerCounseller)
router.put("/updateCounseller",requireAuth,updateCounseller)
router.get("/getCounseller",requireAuth,getCounseller)