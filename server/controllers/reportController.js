import {
  fetchReportsByType,
  fetchReportStats,
  fetchReportTimeline,
  fetchRecentReports,
  deleteReportById,
  updateReportById,
} from "../models/reportModel.js";
export const getReports = async (req, res) => {
  try {
    const reportType = req.query.type;
    const rows = await fetchReportsByType(reportType);

    const transformedResults = rows.map((row) => {
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
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

// ✅ New function for getting report stats
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

// ✅ New function for deleting a report
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

// ✅ New function for updating a report
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
