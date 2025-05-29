import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import pool from "./config/db.js";
import reportsRoutes from "./routes/reportsApi.js";
import userRoutes from "./routes/userApi.js";
import calendarRoutes from "./routes/calendarRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Check DB connection
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("❌ Database connection error:", err);
  } else {
    console.log("✅ Database connected at:", res.rows[0].now);
  }
});
console.log("🚀 Server is running...");

// Routes
app.use("/api/reports", reportsRoutes);
app.use("/api/users", userRoutes);
app.use("/api/calendar", calendarRoutes);
app.use("/api/auth", authRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
