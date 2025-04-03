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

    // Transform the data to structure the location info as its own object
    const transformedResults = result.rows.map((row) => {
      // Extract location-related fields
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
        location_description, // Using aliased name for location description
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
        description: location_description, // Ensure using the aliased name
      };

      // Return the transformed row with location as a nested object
      return {
        ...reportData,
        location, // Location is now a nested object
      };
    });

    console.log(result.rows); // Check the raw output of the query

    console.log(
      `✅ Fetched ${transformedResults.length} records from ${table}`
    );
    return res.json(transformedResults);
  } catch (error) {
    console.error("❌ Error fetching reports:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

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

export default router;
