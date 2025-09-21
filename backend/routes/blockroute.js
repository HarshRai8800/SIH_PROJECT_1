import express from "express";
import { requireAuth } from "@clerk/express";
import { getBlockRequest, submitBlockRequest } from "../controllers/blockrequest.js";

const blockrouter = express.Router();


blockrouter.post("/blockrequest",requireAuth(),submitBlockRequest) 
blockrouter.get("/getblockrequests",requireAuth(),getBlockRequest)

export default blockrouter;
