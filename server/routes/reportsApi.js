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
          LEFT JOIN hazard_group hg ON o.group_id = hg.id
        `,
        extraColumns: `
          l.name AS location_name,
          u.first_name AS first_name,
          u.last_name AS last_name,
          u.email AS email,
          e.name AS equipment_name,
          hg.name AS type,
          o.env_comment AS cause,  
          o.corrective_actions AS recommendation  
        `,
      },

      incidents: {
        table: "incident",
        joins: `
          LEFT JOIN location l ON o.location_id = l.id
          LEFT JOIN users u ON o.submitted_by = u.id
          LEFT JOIN incident_type it ON o.primary_incident_type_id = it.id
        `,
        extraColumns: `
          l.name AS location_name,
          u.first_name AS first_name,
          u.last_name AS last_name,
          u.email AS email,
          it.name AS type,
          it.name AS title,
          o.pi_actual_severity AS severity  -- Corrected this line
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
          u.first_name AS first_name,
          u.last_name AS last_name,
          u.email AS email
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
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const reportType = req.query.type; // Report type must be passed in the query

    const validReportTypes = {
      observations: "observation",
      hazards: "hazard",
      incidents: "incident",
      near_miss: "near_miss",
    };

    if (!validReportTypes[reportType]) {
      return res.status(400).json({ error: "Invalid report type" });
    }

    const table = validReportTypes[reportType];

    const query = `DELETE FROM ${table} WHERE id = $1 RETURNING *`;
    const result = await pool.query(query, [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Report not found" });
    }

    console.log(`🗑️ Deleted report with ID: ${id} from ${table}`);
    return res.json({ message: "Report deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting report:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
