import express from "express";
import { updateUser } from "../controllers/updateuser.js";
import { requireAuth } from "@clerk/express";


const router = express.Router();

router.put("/update", requireAuth(), updateUser);

export default router;
