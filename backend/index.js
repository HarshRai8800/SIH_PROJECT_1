import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import router from "./routes/loginroute.js";
import updateUserRoute from "./routes/updateUser.js";
import http from "http";
import socketConfig from "./socket-io/socket-io.js";
import ticket from "./routes/createticket.js"
import counseller from "./routes/counseller.js"
import getUser from "./routes/getUser.js"
import adminRoutes from "./routes/admin/adminroutes.js";
import blockrouter from "./routes/blockroute.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(cors({
    origin: "https://sih-project-1-git-main-harshrai8800s-projects.vercel.app?_vercel_share=LpGJoImaQYUvhOjX8g2cO5q2jyoIY64v", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,  
  }));
app.use(express.json());

// Attach Clerk auth to all requests so req.auth is populated
app.use(clerkMiddleware());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Auth routes
app.use("/api", router);
app.use("/api/user",updateUserRoute)
app.use("/api/ticket",ticket)
app.use("/api/counseller",counseller)
app.use("/api/get",getUser)
app.use("/api/admin",adminRoutes)
app.use("/api/block",blockrouter)

socketConfig(server);


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
