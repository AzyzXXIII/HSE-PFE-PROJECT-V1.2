import express from "express";
import pool from "../config/db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        users.id,
        users.first_name,
        users.last_name,
        users.email,
        users.password,
        users.phone,
        users.status,
        users.can_send_reports,
        users.can_edit_reports,
        users.can_delete_reports,
        users.qr_code,
        role.role_name,
        location.name as location_name
      FROM users
      LEFT JOIN role ON users.role_id = role.id
      LEFT JOIN location ON users.location_id = location.id
    `);
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
// CREATE a new employee
router.post("/", async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      role_id,
      location_id,
      phone,
      status,
      can_send_reports,
      can_edit_reports,
      can_delete_reports,
      qr_code,
    } = req.body;

    const result = await pool.query(
      `INSERT INTO users (
        first_name, last_name, email, password,
        role_id, location_id, phone, status,
        can_send_reports, can_edit_reports, can_delete_reports, qr_code
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *`,
      [
        first_name,
        last_name,
        email,
        password,
        role_id,
        location_id,
        phone,
        status || "pending",
        can_send_reports || false,
        can_edit_reports || false,
        can_delete_reports || false,
        qr_code || null,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Create employee error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// UPDATE existing employee
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      firstName,
      lastName,
      email,
      password,
      titleId, // -> role_id
      departmentId, // -> location_id
      phone,
      status,
      can_send_reports,
      can_edit_reports,
      can_delete_reports,
      qr_code,
    } = req.body;

    // Convert camelCase to snake_case
    const first_name = firstName || null;
    const last_name = lastName || null;
    const role_id =
      titleId === undefined || titleId === "" ? null : parseInt(titleId);
    const location_id =
      departmentId === undefined || departmentId === ""
        ? null
        : parseInt(departmentId);

    const result = await pool.query(
      `UPDATE users SET
        first_name = $1,
        last_name = $2,
        email = $3,
        password = COALESCE($4, password),
        role_id = $5,
        location_id = $6,
        phone = $7,
        status = $8,
        can_send_reports = $9,
        can_edit_reports = $10,
        can_delete_reports = $11,
        qr_code = $12
      WHERE id = $13 RETURNING *`,
      [
        first_name,
        last_name,
        email,
        password || null,
        role_id,
        location_id,
        phone,
        status,
        can_send_reports,
        can_edit_reports,
        can_delete_reports,
        qr_code,
        id,
      ]
    );

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Update employee error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// GET roles
router.get("/roles", async (req, res) => {
  const result = await pool.query("SELECT id, role_name FROM role");
  res.json(result.rows);
});

// GET locations
router.get("/locations", async (req, res) => {
  const result = await pool.query("SELECT id, name FROM location");
  res.json(result.rows);
});

export default router;
