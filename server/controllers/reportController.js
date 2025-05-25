import {
  fetchReportsByType,
  fetchReportStats,
  fetchReportTimeline,
  fetchRecentReports,
  deleteReportById,
  updateReportById,
  fetchReportById, // Add this new function
} from "../models/reportModel.js";

export const getReports = async (req, res) => {
  try {
    const reportType = req.query.type;
    const rows = await fetchReportsByType(reportType);

    return res.json(rows);
  } catch (error) {
    console.error("❌ Error fetching reports:", error.message);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

export const getStats = async (req, res) => {
  console.log("🔍 Requested report type for stats:", req.query.type);
  try {
    const type = req.query.type?.toLowerCase();
    const last = req.query.last;

    if (!type) {
      return res.status(400).json({ error: "Report type is required" });
    }

    const stats = await fetchReportStats(type, last);

    return res.json({
      ...stats,
      high_severity_count: stats.high_severity_count || 0,
    });
  } catch (error) {
    console.error("❌ Error fetching stats:", error.message);
    return res
      .status(500)
      .json({ error: error.message || "Internal Server Error" });
  }
};

export const getTimeline = async (req, res) => {
  console.log("🔍 Requested timeline for report type:", req.query.type);

  try {
    const type = req.query.type;
    const last = parseInt(req.query.last);

    if (!type) {
      return res.status(400).json({ error: "Report type is required" });
    }

    const timeline = await fetchReportTimeline(type, last);
    return res.json(timeline);
  } catch (error) {
    console.error("❌ Error fetching timeline:", error.message);
    return res
      .status(500)
      .json({ error: error.message || "Internal Server Error" });
  }
};

export const getRecentReports = async (req, res) => {
  console.log("🔍 Fetching recent reports...");
  try {
    const recentReports = await fetchRecentReports();
    res.json(recentReports);
  } catch (error) {
    console.error("❌ Error fetching recent reports:", error.message);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

export const deleteReport = async (req, res) => {
  console.log("🗑️ Deleting report...");
  try {
    const { id } = req.params;
    const { type } = req.query;

    if (!type) {
      return res.status(400).json({ error: "Report type is required" });
    }

    await deleteReportById(type, id);
    return res.json({ message: "Report deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting report:", error.message);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

export const updateReport = async (req, res) => {
  console.log("✏️ Updating report...");
  try {
    const { id } = req.params;
    const { type } = req.query;
    const { status, priority, historyAction } = req.body;

    if (!type) {
      return res.status(400).json({ error: "Report type is required" });
    }

    const updatedReport = await updateReportById(
      type,
      id,
      status,
      priority,
      historyAction
    );
    return res.json(updatedReport);
  } catch (error) {
    console.error("❌ Error updating report:", error.message);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

export const exportReportCSV = async (req, res) => {
  console.log("📄 Exporting report to CSV...");

  try {
    const { id } = req.params;
    const { type } = req.query;
    if (!type) {
      return res.status(400).json({ error: "Report type is required" });
    }
    if (!id) {
      return res.status(400).json({ error: "Report ID is required" });
    }
    const report = await fetchReportById(type, id);

    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }
    const csvContent = generateReportCSV(report, type);

    const filename = `report_${id}_${type}_${
      new Date().toISOString().split("T")[0]
    }.csv`;

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Pragma", "no-cache");

    return res.send(csvContent);
  } catch (error) {
    console.error("❌ Error exporting report to CSV:", error.message);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

// Helper function to generate CSV content
const generateReportCSV = (report, reportType) => {
  const escapeCSVValue = (value) => {
    if (value === null || value === undefined) return "";
    const stringValue = String(value);
    if (
      stringValue.includes(",") ||
      stringValue.includes('"') ||
      stringValue.includes("\n")
    ) {
      return `"${stringValue.replace(/"/g, '""')}"`;
    }
    return stringValue;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      return new Date(dateString).toLocaleString();
    } catch {
      return dateString;
    }
  };

  // Basic report information
  let csvRows = [];

  // Header section
  csvRows.push(["Report Export"]);
  csvRows.push(["Generated on:", new Date().toLocaleString()]);
  csvRows.push([""]); // Empty row for spacing

  // Basic Information
  csvRows.push(["=== BASIC INFORMATION ==="]);
  csvRows.push(["Report ID:", escapeCSVValue(report.id)]);
  csvRows.push(["Report Type:", escapeCSVValue(reportType)]);
  csvRows.push(["Title:", escapeCSVValue(report.title || "N/A")]);
  csvRows.push(["Status:", escapeCSVValue(report.status)]);
  csvRows.push(["Priority:", escapeCSVValue(report.priority)]);
  csvRows.push([
    "Severity:",
    escapeCSVValue(report.severity || report.pi_actual_severity),
  ]);
  csvRows.push(["Date:", formatDate(report.date)]);
  csvRows.push(["Time:", escapeCSVValue(report.time || "N/A")]);
  csvRows.push(["Created At:", formatDate(report.created_at)]);
  csvRows.push(["Updated At:", formatDate(report.updated_at)]);
  csvRows.push([""]); // Empty row

  // Submitter Information
  csvRows.push(["=== SUBMITTER INFORMATION ==="]);
  const fullName = [report.first_name, report.last_name]
    .filter(Boolean)
    .join(" ");
  csvRows.push(["Submitted By:", escapeCSVValue(fullName || "N/A")]);
  csvRows.push(["Email:", escapeCSVValue(report.email || "N/A")]);
  csvRows.push([""]); // Empty row

  // Description
  if (report.description || report.pi_description) {
    csvRows.push(["=== DESCRIPTION ==="]);
    csvRows.push([escapeCSVValue(report.description || report.pi_description)]);
    csvRows.push([""]); // Empty row
  }

  // Location Information
  if (report.latitude && report.longitude) {
    csvRows.push(["=== LOCATION INFORMATION ==="]);
    csvRows.push(["Latitude:", escapeCSVValue(report.latitude)]);
    csvRows.push(["Longitude:", escapeCSVValue(report.longitude)]);
    csvRows.push([""]); // Empty row
  }

  // Report Type Specific Information
  csvRows.push(["=== SPECIFIC INFORMATION ==="]);
  const typeSpecificFields = getTypeSpecificFields(report, reportType);
  typeSpecificFields.forEach(([key, value]) => {
    csvRows.push([key + ":", escapeCSVValue(value)]);
  });
  csvRows.push([""]); // Empty row

  // History Actions
  if (
    report.history_actions &&
    Array.isArray(report.history_actions) &&
    report.history_actions.length > 0
  ) {
    csvRows.push(["=== HISTORY ==="]);
    csvRows.push(["Timestamp", "Action", "Performed By"]);

    report.history_actions.forEach((action) => {
      csvRows.push([
        formatDate(action.timestamp),
        escapeCSVValue(action.action),
        escapeCSVValue(action.performed_by),
      ]);
    });
  }

  // Convert rows to CSV string
  return csvRows.map((row) => row.join(",")).join("\n");
};

// Helper function to get type-specific fields based on your actual schema
const getTypeSpecificFields = (report, reportType) => {
  const fields = [];
  const normalizedType = reportType.toLowerCase();

  switch (normalizedType) {
    case "observations": {
      // Fields specific to observations
      addFieldIfExists(fields, "Type", report.type);
      break;
    }

    case "hazards": {
      // Fields specific to hazards
      addFieldIfExists(fields, "Group/Type", report.type);
      addFieldIfExists(fields, "Environmental Comment/Cause", report.cause);
      addFieldIfExists(
        fields,
        "Corrective Actions/Recommendation",
        report.recommendation
      );
      break;
    }

    case "incidents": {
      // Fields specific to incidents
      addFieldIfExists(fields, "Type", report.type);
      addFieldIfExists(fields, "Activity", report.activity);
      addFieldIfExists(
        fields,
        "Affected Body Parts",
        report.affected_body_parts
      );
      addFieldIfExists(fields, "Injury Nature", report.injury_nature);
      addFieldIfExists(fields, "Classification", report.classification);
      addFieldIfExists(fields, "First Aid Measures", report.first_aid_measures);
      addFieldIfExists(fields, "Days Absent", report.days_absent);
      addFieldIfExists(fields, "Lost Time (Minutes)", report.lost_time_minutes);
      addFieldIfExists(
        fields,
        "Lost Consciousness",
        report.lost_consciousness ? "Yes" : "No"
      );
      addFieldIfExists(
        fields,
        "Transferred to Hospital",
        report.was_transferred_to_hospital ? "Yes" : "No"
      );

      // Injured person information
      const injuredName = [report.injured_first_name, report.injured_last_name]
        .filter(Boolean)
        .join(" ");
      addFieldIfExists(fields, "Injured Person", injuredName);
      addFieldIfExists(fields, "Injured Person Email", report.injured_email);
      break;
    }

    case "nearmiss": {
      // Fields specific to near miss
      addFieldIfExists(fields, "Type", report.type);
      addFieldIfExists(fields, "Primary Cause", report.cause);
      break;
    }

    default: {
      // No specific fields for unknown types
      break;
    }
  }

  return fields;
};

// Helper function to add field if it exists and has a value
const addFieldIfExists = (fields, displayName, value) => {
  if (value !== undefined && value !== null && value !== "") {
    fields.push([displayName, value]);
  }
};
