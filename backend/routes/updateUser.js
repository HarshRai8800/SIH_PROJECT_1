import express from "express";
import { updateUser } from "../controllers/updateuser.js";
import { requireAuth } from "@clerk/express";
import {getUser} from "../controllers/getuser.js"

const router = express.Router();

router.put("/update", requireAuth(), updateUser);
router.get("/getUser",requireAuth(),getUser)
export default router;
