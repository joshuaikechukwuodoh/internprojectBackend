import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectMongoDBatlas } from "./config/dbConfig";
import userRoutes from "./routes/userRoutes";
import AIchatRoutes from "./routes/AIchatRoutes";
import moodRoutes from "./routes/moodRoutes"
const app: Application = express();
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.FRONTEND_PORT!,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(cookieParser());
app.use(express.json());
connectMongoDBatlas();
app.use("/user", userRoutes);
app.use("/chat", AIchatRoutes);
app.use("/mood", moodRoutes)

app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Yay, the backend for our internship project is working fine 😎",
  });
});

app.listen(PORT, (error) => {
  if (error) {
    console.log("Error while starting express server", error);
  } else {
    console.log(`Server is running on http://localhost:${PORT}`);
  }
});
