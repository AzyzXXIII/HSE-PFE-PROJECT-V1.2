import express from "express";
import pool from "../config/db.js"; // Correctly import the pool using ES Modules
import {
  getAllUsers,
  changeUserStatus,
  deleteUser,
  createNewUser,
  updateUserDetails,
} from "../controllers/userController.js";

const router = express.Router();

// User routes
router.get("/", getAllUsers);
router.patch("/:id/status", changeUserStatus);
router.delete("/:id", deleteUser);
router.post("/", createNewUser);
router.patch("/:id", updateUserDetails); // For full user update

router.patch("/:id/:action", changeUserStatus);
// GET roles
router.get("/roles", async (req, res) => {
  try {
    const result = await pool.query("SELECT id, role_name FROM role");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("❌ Error fetching roles:", error);
    res.status(500).json({ message: "Error fetching roles" });
  }
});

// GET locations
router.get("/locations", async (req, res) => {
  try {
    const result = await pool.query("SELECT id, name FROM location");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("❌ Error fetching locations:", error);
    res.status(500).json({ message: "Error fetching locations" });
  }
});

// GET access groups
router.get("/access-groups", async (req, res) => {
  try {
    const result = await pool.query("SELECT id, name FROM access_group");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("❌ Error fetching access groups:", error);
    res.status(500).json({ message: "Error fetching access groups" });
  }
});

export default router;
