import express from "express";
import { requireAuth } from "@clerk/express";
import {getUser} from "../controllers/getuser.js"

const router = express.Router();

router.get("/user",requireAuth(),getUser)

export default router;