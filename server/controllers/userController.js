import bcrypt from "bcrypt";
import {
  fetchAllUsers,
  updateUserStatus,
  deleteUserById,
  createUser,
  updateUser,
} from "../models/userModel.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await fetchAllUsers();
    res.json(users);
  } catch (error) {
    console.error("❌ Error fetching users:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

export const changeUserStatus = async (req, res) => {
  try {
    const { id, action } = req.params;

    const statusMapping = {
      accept: "active",
      reject: "rejected",
      block: "inactive",
      unblock: "active",
    };

    const status = statusMapping[action];
    if (!status) {
      return res.status(400).json({ error: "Invalid action" });
    }

    await updateUserStatus(id, status);
    res.status(200).json({ message: `User status updated to ${status}` });
  } catch (error) {
    console.error("❌ Error changing user status:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

// ✅ Delete User
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteUserById(id);
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    console.error("❌ Error deleting user:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

// ✅ Create User with Password Hashing
export const createNewUser = async (req, res) => {
  try {
    const userData = { ...req.body };

    // Hash password if provided
    if (userData.password) {
      const saltRounds = 12;
      userData.password = await bcrypt.hash(userData.password, saltRounds);
    }

    const user = await createUser(userData);
    res.status(201).json(user);
  } catch (error) {
    console.error("❌ Error creating user:", error.message);
    res.status(error.status || 500).json({ error: error.message });
  }
};

// ✅ Update User (PATCH) with Optional Password Hashing
export const updateUserDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    // Hash password if it's being updated
    if (updateData.password) {
      const saltRounds = 12;
      updateData.password = await bcrypt.hash(updateData.password, saltRounds);
    }

    const updatedUser = await updateUser(id, updateData);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("❌ Error updating user:", error.message);
    res.status(500).json({ error: error.message || "Server error" });
  }
};
