import AuthModel from "../models/AuthModel.js";
import { comparePassword } from "..//utils/hash.js";
import { generateToken } from "../utils/jwt.js";

export async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await AuthModel.findByEmail(email);
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

    const token = generateToken({
      id: user.id,
      email: user.email,
      role_id: user.role_id,
    });
    res.json({
      token,
      user: { id: user.id, email: user.email, role_id: user.role_id },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}
