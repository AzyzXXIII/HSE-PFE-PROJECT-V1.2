import AuthModel from "../models/AuthModel.js";
import { comparePassword } from "../utils/hash.js";
import { generateToken } from "../utils/jwt.js";

export async function login(req, res) {
  const { email, password } = req.body;

  try {
    // Get user with permissions
    const user = await AuthModel.findByEmailWithPermissions(email);
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      console.log("Password match result:", isMatch);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (user.status !== "active") {
      return res
        .status(403)
        .json({ message: "Account not approved by admin." });
    }

    // Include permissions in token payload
    const token = generateToken({
      id: user.id,
      email: user.email,
      role_id: user.role_id,
      role_name: user.role_name,
      permissions: user.permissions || [],
      first_name: user.first_name,
      last_name: user.last_name,
    });

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        role_id: user.role_id,
        role_name: user.role_name,
        permissions: user.permissions || [],
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

// Get current user profile with permissions
export async function getProfile(req, res) {
  try {
    const user = await AuthModel.findByIdWithPermissions(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role_id: user.role_id,
        role_name: user.role_name,
        permissions: user.permissions || [],
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}
