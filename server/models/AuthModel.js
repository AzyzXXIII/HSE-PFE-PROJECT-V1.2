import db from "../config/db.js";

const AuthModel = {
  findByEmail: async (email) => {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return result.rows[0];
  },

  // Get user with role and permissions
  findByEmailWithPermissions: async (email) => {
    const query = `
    SELECT 
      u.id, u.first_name, u.last_name, u.email, u.password, 
      u.role_id, u.status, u.location_id, u.phone,
      r.role_name as role_name,
      array_agg(DISTINCT p.name) as permissions
    FROM users u
    LEFT JOIN role r ON u.role_id = r.id
    LEFT JOIN role_permissions rp ON r.id = rp.role_id
    LEFT JOIN permissions p ON rp.permission_id = p.id
    WHERE u.email = $1
    GROUP BY u.id, u.first_name, u.last_name, u.email, u.password, 
             u.role_id, u.status, u.location_id, u.phone, r.role_name
  `;
    const result = await db.query(query, [email]);
    return result.rows[0];
  },

  // Get user by ID with permissions
  findByIdWithPermissions: async (userId) => {
    const query = `
      SELECT 
        u.id, u.first_name, u.last_name, u.email, 
        u.role_id, u.status, u.location_id, u.phone,
        r.name as role_name,
        array_agg(DISTINCT p.name) as permissions
      FROM users u
      LEFT JOIN role r ON u.role_id = r.id
      LEFT JOIN role_permissions rp ON r.id = rp.role_id
      LEFT JOIN permissions p ON rp.permission_id = p.id
      WHERE u.id = $1
      GROUP BY u.id, u.first_name, u.last_name, u.email, 
               u.role_id, u.status, u.location_id, u.phone, r.name
    `;
    const result = await db.query(query, [userId]);
    return result.rows[0];
  },

  // Get all permissions for a role
  getRolePermissions: async (roleId) => {
    const query = `
      SELECT p.name as permission_name, p.id as permission_id
      FROM permissions p
      JOIN role_permissions rp ON p.id = rp.permission_id
      WHERE rp.role_id = $1
    `;
    const result = await db.query(query, [roleId]);
    return result.rows;
  },

  create: async ({
    first_name,
    last_name,
    email,
    password,
    role_id,
    location_id,
    phone,
  }) => {
    const result = await db.query(
      `INSERT INTO users (first_name, last_name, email, password, role_id, location_id, phone, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, 'pending') RETURNING *`,
      [first_name, last_name, email, password, role_id, location_id, phone]
    );
    return result.rows[0];
  },
};

export default AuthModel;
