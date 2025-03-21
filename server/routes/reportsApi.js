import express from "express";
import pool from "../config/db.js";

const router = express.Router();

router.get("/observations", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM observation;");
    console.log(result.rows);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching observations:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
