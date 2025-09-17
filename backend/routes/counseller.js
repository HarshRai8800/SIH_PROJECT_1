import express from "express"
import {registerCounseller,updateCounseller,getCounseller,filterCounseller} from "../controllers/counseller.js"
import { requireAuth } from "@clerk/express";
 
const router = express.Router()



router.post("/registerCounseller",requireAuth(),registerCounseller)
router.put("/updateCounseller",requireAuth(),updateCounseller)
router.get("/getCounseller",requireAuth(),getCounseller)
router.post("/filterCounseller",requireAuth(),filterCounseller)
export default router