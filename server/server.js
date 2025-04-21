// server.js
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import pool from "./config/db.js";
import reportsRoutes from "./routes/reportsApi.js";
import userRoutes from "./routes/employeesApi.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("❌ Database connection error:", err);
  } else {
    console.log("✅ Database connected at:", res.rows[0].now);
  }
});

app.use("/api/reports", reportsRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
