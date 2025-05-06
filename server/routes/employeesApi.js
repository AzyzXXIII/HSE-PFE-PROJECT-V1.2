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
        users.phone,
        users.status,
        users.qr_code,
        role.role_name,
        location.name as location_name,
        access_group.name as access_group_name
      FROM users
      LEFT JOIN role ON users.role_id = role.id
      LEFT JOIN location ON users.location_id = location.id
      LEFT JOIN access_group ON users.access_group_id = access_group.id
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
      access_group_id,
      qr_code,
    } = req.body;

    // Check if email already exists in the database
    const emailCheckResult = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    if (emailCheckResult.rows.length > 0) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Insert the new user into the database
    const result = await pool.query(
      `INSERT INTO users (
        first_name, last_name, email, password,
        role_id, location_id, phone, status,
        access_group_id, qr_code
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
      [
        first_name,
        last_name,
        email,
        password,
        role_id,
        location_id,
        phone,
        status || "pending",
        access_group_id ? parseInt(access_group_id) : null,
        qr_code || null,
      ]
    );

    // Return the created user
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Create employee error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// UPDATE existing employee
// Express backend route: routes/employees.js

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const existingUser = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);

    if (existingUser.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const existing = existingUser.rows[0];

    const {
      firstName,
      lastName,
      email,
      password,
      titleId, // corresponds to role_id
      departmentId, // corresponds to location_id
      phone,
      status,
      qr_code,
      access_group_id,
    } = req.body;

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
        qr_code = $9,
        access_group_id = $10
      WHERE id = $11 RETURNING *`,
      [
        firstName || existing.first_name,
        lastName || existing.last_name,
        email || existing.email,
        password || existing.password,
        titleId !== null && titleId !== undefined
          ? parseInt(titleId)
          : existing.role_id,
        departmentId !== null && departmentId !== undefined
          ? parseInt(departmentId)
          : existing.location_id,
        phone || existing.phone,
        status || existing.status,
        qr_code || existing.qr_code,
        access_group_id !== null && access_group_id !== undefined
          ? parseInt(access_group_id)
          : existing.access_group_id,
        id,
      ]
    );

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Update user error:", err.message);
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

// GET access groups
router.get("/access-groups", async (req, res) => {
  const result = await pool.query("SELECT id, name FROM access_group");
  res.json(result.rows);
});

export default router;
