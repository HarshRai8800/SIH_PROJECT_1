import express from "express";
import { requireAuth } from "@clerk/express";
import {
  adminLogin,
  addStudent,
  getAllStudents,
  addCounsellor,
  blockCounsellor,
  getAllCounsellors,
  blockStudent
} from "../../controllers/admin/admincontrollers.js";

const adminRoutes = express.Router();

adminRoutes.post("/login",requireAuth(), adminLogin);

adminRoutes.post("/addStudent", requireAuth(), addStudent);
adminRoutes.delete("/blockStudent", requireAuth(), blockStudent);
adminRoutes.get("/getAllStudents", requireAuth(), getAllStudents);

adminRoutes.post("/addCounsellor", requireAuth(), addCounsellor);
adminRoutes.delete("/blockCounsellor", requireAuth(), blockCounsellor);
adminRoutes.get("/getAllCounsellors", requireAuth(), getAllCounsellors);

export default adminRoutes;
