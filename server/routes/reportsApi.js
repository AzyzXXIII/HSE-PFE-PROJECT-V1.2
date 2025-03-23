import express from "express";
import pool from "../config/db.js";

const router = express.Router();

// Handle dynamic report fetching based on query parameters
router.get("/", async (req, res) => {
  try {
    const reportType = req.query.type;

    // Map report types to their corresponding database tables
    const validReportTypes = {
      observations: "observation",
      hazards: "hazard",
      incidents: "incident",
      near_miss: "near_miss",
    };

    if (!validReportTypes[reportType]) {
      return res.status(400).json({ error: "Invalid report type" });
    }

    const tableName = validReportTypes[reportType];
    const result = await pool.query(`SELECT * FROM ${tableName};`);

    console.log(`✅ Fetched ${result.rows.length} records from ${tableName}`);
    return res.json(result.rows);
  } catch (error) {
    console.error("❌ Error fetching reports:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
