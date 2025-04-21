// routes/userRoutes.js
import express from "express";
import pool from "../config/db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});
// Accept employee
router.patch("/:id/accept", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("UPDATE users SET status = 'active' WHERE id = $1", [id]);
    res.status(200).json({ message: "Employee accepted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Reject employee
router.patch("/:id/reject", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("UPDATE users SET status = 'rejected' WHERE id = $1", [
      id,
    ]);
    res.status(200).json({ message: "Employee rejected" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE employee by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM users WHERE id = $1", [id]);
    res.status(200).json({ message: "Employee deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});
export default router;
