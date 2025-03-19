import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import pool from "./config/db.js"; // Import PostgreSQL connection

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Test Database Connection
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("❌ Database connection error:", err);
  } else {
    console.log("✅ Database connected at:", res.rows[0].now);
  }
});
// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
