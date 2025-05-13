// src/models/reportModel.js
import pool from "../config/db.js";
import getReportConfig from "../config/reportConfig.js";

// Existing function (no change)
export const fetchReportsByType = async (reportType) => {
  const reportConfig = getReportConfig(reportType);

  if (!reportConfig) {
    throw new Error("Invalid report type");
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
  return result.rows;
};

// ✅ New function for fetching stats
export const fetchReportStats = async (reportType, last) => {
  const reportConfig = getReportConfig(reportType);
  if (!reportConfig) {
    throw new Error("Invalid report type");
  }

  const { table, severityColumn } = reportConfig;

  let dateCondition = "";
  if (last && last !== "all") {
    dateCondition = `WHERE date >= CURRENT_DATE - INTERVAL '${last} days'`;
  }

  const query = `
    SELECT 
      COUNT(*) AS total_reports,
      COUNT(DISTINCT submitted_by) AS unique_employees,
      COUNT(*) FILTER (WHERE status = 'in progress') AS pending_reports
      ${
        severityColumn
          ? `, COUNT(*) FILTER (
              WHERE LOWER(${severityColumn}) = 'high'
              ${
                last && last !== "all"
                  ? `AND date >= CURRENT_DATE - INTERVAL '${last} days'`
                  : ""
              }
            ) AS high_severity_count`
          : ""
      }
    FROM ${table}
    ${dateCondition};
  `;

  const result = await pool.query(query);
  return result.rows[0];
};

// ✅ New function for fetching report timeline
export const fetchReportTimeline = async (reportType, last) => {
  const reportConfig = getReportConfig(reportType);
  if (!reportConfig) {
    throw new Error("Invalid report type");
  }

  const { table } = reportConfig;
  let whereClause = "";

  if (!isNaN(last)) {
    whereClause = `WHERE date >= CURRENT_DATE - INTERVAL '${last} days'`;
  }

  const query = `
    SELECT 
      TO_CHAR(date, 'YYYY-MM') AS month,
      COUNT(*) AS count
    FROM ${table}
    ${whereClause}
    GROUP BY month
    ORDER BY month;
  `;

  const result = await pool.query(query);

  return result.rows.map((row) => ({
    month: row.month,
    count: parseInt(row.count),
  }));
};

export const fetchRecentReports = async () => {
  const tables = ["observation", "incident", "nearmiss", "hazard"];
  console.log("✅ Fetching recent reports...");

  const recentReports = await Promise.all(
    tables.map(async (table) => {
      console.log(`✅ Fetching from table: ${table}`);

      // Check if the 'time' column exists in the table
      const checkTimeColumnQuery = `
        SELECT column_name
        FROM information_schema.columns
        WHERE table_name = $1 AND column_name = 'time';
      `;
      const timeColumnResult = await pool.query(checkTimeColumnQuery, [table]);

      let query = `SELECT *, '${table}' AS report_type FROM ${table} ORDER BY date DESC`;

      // If the 'time' column exists, include it in the ORDER BY clause
      if (timeColumnResult.rows.length > 0) {
        query += `, time DESC`;
      }

      // Fetch the data
      const result = await pool.query(query);
      console.log(`✅ ${table} reports fetched:`, result.rows.length);
      return result.rows;
    })
  );

  // Combine, sort, and limit to 5 recent reports
  const allReports = recentReports
    .flat()
    .sort(
      (a, b) =>
        new Date(b.date) - new Date(a.date) ||
        new Date(b.time || "00:00:00") - new Date(a.time || "00:00:00")
    )
    .slice(0, 5);

  console.log("✅ All reports combined:", allReports.length);
  return allReports;
};

export const deleteReportById = async (reportType, id) => {
  const reportConfig = getReportConfig(reportType);
  if (!reportConfig) {
    throw new Error("Invalid report type");
  }

  const { table } = reportConfig;
  const query = `DELETE FROM ${table} WHERE id = $1 RETURNING *`;
  const result = await pool.query(query, [id]);

  if (result.rowCount === 0) {
    throw new Error("Report not found");
  }

  console.log(`🗑️ Deleted report with ID: ${id} from ${table}`);
  return result.rows[0];
};

// ✅ New function for updating a report
export const updateReportById = async (
  reportType,
  id,
  status,
  priority,
  historyAction
) => {
  const reportConfig = getReportConfig(reportType);
  if (!reportConfig) {
    throw new Error("Invalid report type");
  }

  const { table } = reportConfig;

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
    throw new Error("Report not found");
  }

  return result.rows[0];
};
