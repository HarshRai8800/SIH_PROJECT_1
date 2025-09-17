import express from "express";
import { requireAuth } from "@clerk/express";
import {
  addStudent,
  deleteStudent,
  getAllStudents,
  addCounsellor,
  deleteCounsellor,
  getAllCounsellors
} from "../controllers/admincontroller.js";

const router = express.Router();

router.post("/addStudent", requireAuth(), addStudent);
router.delete("/deleteStudent", requireAuth(), deleteStudent);
router.get("/getAllStudents", requireAuth(), getAllStudents);

router.post("/addCounsellor", requireAuth(), addCounsellor);
router.delete("/deleteCounsellor", requireAuth(), deleteCounsellor);
router.get("/getAllCounsellors", requireAuth(), getAllCounsellors);

export default router;
