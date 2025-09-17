import express from "express";
import { requireAuth } from "@clerk/express";
import {
  adminLogin,
  addStudent,
  deleteStudent,
  getAllStudents,
  addCounsellor,
  deleteCounsellor,
  getAllCounsellors
} from "../../controllers/admin/admincontrollers.js";

const adminRoutes = express.Router();

adminRoutes.post("/login",requireAuth(), adminLogin);

adminRoutes.post("/addStudent", requireAuth(), addStudent);
adminRoutes.delete("/deleteStudent", requireAuth(), deleteStudent);
adminRoutes.get("/getAllStudents", requireAuth(), getAllStudents);

adminRoutes.post("/addCounsellor", requireAuth(), addCounsellor);
adminRoutes.delete("/deleteCounsellor", requireAuth(), deleteCounsellor);
adminRoutes.get("/getAllCounsellors", requireAuth(), getAllCounsellors);

export default adminRoutes;
