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
router.delete("/:id", deleteReport);
router.put("/:id", updateReport);

export default router;
