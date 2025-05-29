import { verifyToken } from "../../src/utils/jwt.js";
import AuthModel from "../models/AuthModel.js";

// Your existing authenticateToken function - enhanced to include permissions
export async function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Access token required" });

  try {
    const user = verifyToken(token);

    // Get fresh user data with permissions
    const userWithPermissions = await AuthModel.findByIdWithPermissions(
      user.id
    );
    if (!userWithPermissions) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // Attach enhanced user data to request
    req.user = {
      ...user,
      role_name: userWithPermissions.role_name,
      permissions: userWithPermissions.permissions || [],
    };

    next();
  } catch {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
}

// Your existing requireRole function
export function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role_id)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
}

// Check if user has specific permission
export const hasPermission = (requiredPermission) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const userPermissions = req.user.permissions || [];

    if (userPermissions.includes(requiredPermission)) {
      next();
    } else {
      return res.status(403).json({
        message: `Access denied. Required permission: ${requiredPermission}`,
      });
    }
  };
};

// Check if user has any of the specified permissions
export const hasAnyPermission = (permissions) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const userPermissions = req.user.permissions || [];
    const hasAccess = permissions.some((permission) =>
      userPermissions.includes(permission)
    );

    if (hasAccess) {
      next();
    } else {
      return res.status(403).json({
        message: `Access denied. Required one of: ${permissions.join(", ")}`,
      });
    }
  };
};

// Check if user has all specified permissions
export const hasAllPermissions = (permissions) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const userPermissions = req.user.permissions || [];
    const hasAllAccess = permissions.every((permission) =>
      userPermissions.includes(permission)
    );

    if (hasAllAccess) {
      next();
    } else {
      return res.status(403).json({
        message: `Access denied. Required all of: ${permissions.join(", ")}`,
      });
    }
  };
};

// Check if user has specific role
export const hasRole = (requiredRole) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    if (req.user.role_name === requiredRole) {
      next();
    } else {
      return res.status(403).json({
        message: `Access denied. Required role: ${requiredRole}`,
      });
    }
  };
};

// Check if user has any of the specified roles
export const hasAnyRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    if (roles.includes(req.user.role_name)) {
      next();
    } else {
      return res.status(403).json({
        message: `Access denied. Required one of roles: ${roles.join(", ")}`,
      });
    }
  };
};
