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

    // Fetch observation details with user, type, and location details
    const query = `
 SELECT 
  o.*, 
  ot.type AS observation_type,  -- Fix column name
  l.name AS location_name,  -- Fetching the location name from the location table
  u.first_name AS submitted_by_first_name, 
  u.last_name AS submitted_by_last_name, 
  u.email AS submitted_by_email
FROM ${tableName} o
LEFT JOIN observation_type ot ON o.type_id = ot.id
LEFT JOIN location l ON o.location_id = l.id  -- This joins the location table
LEFT JOIN users u ON o.submitted_by = u.id;

  `;

    const result = await pool.query(query);

    console.log(`✅ Fetched ${result.rows.length} records from ${tableName}`);
    return res.json(result.rows);
  } catch (error) {
    console.error("❌ Error fetching reports:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
