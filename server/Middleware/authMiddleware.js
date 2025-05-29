import { verifyToken } from "../../src/utils/jwt.js";

export function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Access token required" });

  try {
    const user = verifyToken(token);
    req.user = user;
    next();
  } catch {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
}

export function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role_id)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
}
