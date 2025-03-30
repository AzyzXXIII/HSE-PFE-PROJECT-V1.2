import express from "express";
import pool from "../config/db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const reportType = req.query.type;

    const validReportTypes = {
      observations: {
        table: "observation",
        joins: `
          LEFT JOIN observation_type ot ON o.type_id = ot.id
          LEFT JOIN location l ON o.location_id = l.id
          LEFT JOIN users u ON o.submitted_by = u.id
        `,
        extraColumns: `
          ot.type AS type,
          l.name AS location_name,
          u.first_name AS first_name,
          u.last_name AS last_name,
          u.email AS email
        `,
      },
      hazards: {
        table: "hazard",
        joins: `
          LEFT JOIN location l ON o.location_id = l.id
          LEFT JOIN users u ON o.submitted_by = u.id
          LEFT JOIN equipment e ON o.equipment_id = e.id
        `,
        extraColumns: `
          l.name AS location_name,
          u.first_name AS submitted_by_first_name,
          u.last_name AS submitted_by_last_name,
          u.email AS submitted_by_email,
          e.name AS equipment_name
        `,
      },
      incidents: {
        table: "incident",
        joins: `
          LEFT JOIN location l ON o.location_id = l.id
          LEFT JOIN users u ON o.submitted_by = u.id
        `,
        extraColumns: `
          l.name AS location_name,
          u.first_name AS submitted_by_first_name,
          u.last_name AS submitted_by_last_name,
          u.email AS submitted_by_email
        `,
      },
      near_miss: {
        table: "near_miss",
        joins: `
          LEFT JOIN location l ON o.location_id = l.id
          LEFT JOIN users u ON o.submitted_by = u.id
        `,
        extraColumns: `
          l.name AS location_name,
          u.first_name AS submitted_by_first_name,
          u.last_name AS submitted_by_last_name,
          u.email AS submitted_by_email
        `,
      },
    };

    if (!validReportTypes[reportType]) {
      return res.status(400).json({ error: "Invalid report type" });
    }

    const { table, joins, extraColumns } = validReportTypes[reportType];

    const query = `
      SELECT 
        o.*, 
        ${extraColumns}
      FROM ${table} o
      ${joins};
    `;

    const result = await pool.query(query);

    console.log(`✅ Fetched ${result.rows.length} records from ${table}`);
    return res.json(result.rows);
  } catch (error) {
    console.error("❌ Error fetching reports:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
