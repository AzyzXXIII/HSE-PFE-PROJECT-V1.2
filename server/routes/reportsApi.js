import express from "express";
import pool from "../config/db.js";
import getReportConfig from "../config/reportConfig.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const reportType = req.query.type;
    const reportConfig = getReportConfig(reportType);

    if (!reportConfig) {
      return res.status(400).json({ error: "Invalid report type" });
    }

    const { table, joins, extraColumns } = reportConfig;

    const query = `
      SELECT 
        o.*, 
        ${extraColumns}
      FROM ${table} o
      ${joins};
    `;

    const result = await pool.query(query);

    const transformedResults = result.rows.map((row) => {
      const {
        location_id,
        location_name,
        department,
        area_type,
        floor,
        location_code,
        capacity,
        hazard_level,
        latitude,
        longitude,
        loc_description,
        ...reportData
      } = row;

      const location = {
        id: location_id,
        name: location_name,
        department,
        area_type,
        floor,
        location_code,
        capacity,
        hazard_level,
        latitude,
        longitude,
        loc_description,
      };

      return {
        ...reportData,
        location,
      };
    });

    console.log(
      `✅ Fetched ${transformedResults.length} records from ${reportType}`
    );
    return res.json(transformedResults);
  } catch (error) {
    console.error("❌ Error fetching reports:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a report
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const reportType = req.query.type;

    const reportConfig = getReportConfig(reportType);
    if (!reportConfig) {
      return res.status(400).json({ error: "Invalid report type" });
    }

    const table = reportConfig.table;

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

// Update a report
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { type } = req.query;
    const { status, priority, historyAction } = req.body;

    const reportConfig = getReportConfig(type);
    if (!reportConfig) {
      return res.status(400).json({ error: "Invalid report type" });
    }

    const table = reportConfig.table;

    const updateQuery = `
      UPDATE ${table}
      SET status = $1,
          priority = $2,
          history_actions = COALESCE(history_actions, '[]'::jsonb) || $3::jsonb
      WHERE id = $4
      RETURNING *;
    `;

    const result = await pool.query(updateQuery, [
      status,
      priority,
      JSON.stringify([historyAction]),
      id,
    ]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Report not found" });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    console.error("❌ Error updating report:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ GET individual stats for a single type (used by frontend)

router.get("/stats", async (req, res) => {
  try {
    const type = req.query.type;
    const reportConfig = getReportConfig(type);

    if (!reportConfig) {
      return res.status(400).json({ error: "Invalid report type" });
    }

    const { table, severityColumn } = reportConfig;

    console.log("📊 Severity Column:", severityColumn);

    const baseQuery = `
      SELECT 
        COUNT(*) AS total_reports,
        COUNT(DISTINCT submitted_by) AS unique_employees,
        COUNT(*) FILTER (WHERE status = 'in progress') AS pending_reports
        ${
          severityColumn
            ? `, COUNT(*) FILTER (WHERE LOWER(${severityColumn}) = 'high') AS high_severity_count`
            : ""
        }
      FROM ${table};
    `;

    const result = await pool.query(baseQuery);
    const stats = result.rows[0];

    // Ensure consistent return shape
    return res.json({
      ...stats,
      high_severity_count: stats.high_severity_count || 0,
    });
  } catch (error) {
    console.error("❌ Error fetching stats for type:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
