import express from "express";
import {
  getReports,
  getStats,
  getTimeline,
  getRecentReports,
  deleteReport,
  updateReport,
} from "../controllers/reportController.js";

const router = express.Router();

router.get("/", getReports);
router.get("/stats", getStats);
router.get("/timeline", getTimeline);
router.get("/recent", getRecentReports);
// ✅ New Delete Report Route
router.delete("/:id", deleteReport);

// ✅ New Update Report Route
router.put("/:id", updateReport);

export default router;
