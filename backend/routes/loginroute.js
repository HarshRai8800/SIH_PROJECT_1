import express from "express";
import { requireAuth } from "@clerk/express";
import { registerUser } from "../controllers/logincontroller.js";

const router = express.Router();

router.post("/registerUser", requireAuth(), registerUser);

export default router;

