import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import cors from "cors";

import cookieParser from "cookie-parser";
// import connectDatabase from './utils/utils.db';

import sequelize from "./sequelize/sequelize";

import mainRoutes from "./routes/mainRoutes";

sequelize
  .sync({ alter: true }) // or { force: true } for dev
  .then(() => {
    console.log("✅ MySQL models synced");
  })
  .catch((err) => {
    console.error("❌ Sequelize sync error:", err);
  });

// Load environment variables from .env file
dotenv.config();

// Connect to the database mongodb
// connectDatabase()

// Initialize Express application
const app = express();

// Middleware
// app.use(cors());
app.use(cors({ origin: ["http://localhost:3000", "http://localhost:5173"] }));
app.use(cookieParser()); // Parse cookies
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Routes
app.use("/api/v1", mainRoutes);

// Default route
app.get("/", (req: Request, res: Response, next: any) => {
  res.send("Demo TypeScript app check");
});

// Server configuration
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
