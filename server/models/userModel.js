import pool from "../config/db.js";

// ✅ Fetch all users with related data
export const fetchAllUsers = async () => {
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
  return result.rows;
};

// ✅ Change user status
export const updateUserStatus = async (id, status) => {
  await pool.query("UPDATE users SET status = $1 WHERE id = $2", [status, id]);
};

// ✅ Delete User
export const deleteUserById = async (id) => {
  await pool.query("DELETE FROM users WHERE id = $1", [id]);
};

// ✅ Create User
export const createUser = async (userData) => {
  const {
    firstName,
    lastName,
    email,
    password,
    titleId,
    departmentId,
    phone,
    status = "pending",
    access_group_id,
    qr_code,
  } = userData;

  // Check if email already exists
  const emailCheckResult = await pool.query(
    "SELECT id FROM users WHERE email = $1",
    [email]
  );

  if (emailCheckResult.rows.length > 0) {
    const error = new Error("Email already exists");
    error.status = 409; // HTTP 409 Conflict for duplicate resource
    throw error;
  }

  const result = await pool.query(
    `INSERT INTO users (
      first_name, last_name, email, password,
      role_id, location_id, phone, status,
      access_group_id, qr_code
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
    [
      firstName,
      lastName,
      email,
      password,
      titleId,
      departmentId,
      phone,
      status,
      access_group_id ? parseInt(access_group_id) : null,
      qr_code || null,
    ]
  );

  return result.rows[0];
};

// ✅ Update User
export const updateUser = async (id, userData) => {
  const existingUser = await pool.query("SELECT * FROM users WHERE id = $1", [
    id,
  ]);

  if (existingUser.rows.length === 0) {
    throw new Error("User not found");
  }

  const {
    firstName,
    lastName,
    email,
    password,
    titleId,
    departmentId,
    phone,
    status,
    qr_code,
    access_group_id,
  } = userData;

  const result = await pool.query(
    `UPDATE users SET
      first_name = COALESCE($1, first_name),
      last_name = COALESCE($2, last_name),
      email = COALESCE($3, email),
      password = COALESCE($4, password),
      role_id = COALESCE($5, role_id),
      location_id = COALESCE($6, location_id),
      phone = COALESCE($7, phone),
      status = COALESCE($8, status),
      qr_code = COALESCE($9, qr_code),
      access_group_id = COALESCE($10, access_group_id)
    WHERE id = $11 
    RETURNING *`,
    [
      firstName,
      lastName,
      email,
      password,
      titleId,
      departmentId,
      phone,
      status,
      qr_code,
      access_group_id,
      id,
    ]
  );

  return result.rows[0];
};

/* export const updateUser = async (id, userData) => {
  const existingUser = await pool.query("SELECT * FROM users WHERE id = $1", [
    id,
  ]);

  if (existingUser.rows.length === 0) {
    throw new Error("User not found");
  }

  const existing = existingUser.rows[0];

  const {
    firstName,
    lastName,
    email,
    password,
    titleId,
    departmentId,
    phone,
    status,
    qr_code,
    access_group_id,
  } = userData;

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
      titleId || existing.role_id,
      departmentId || existing.location_id,
      phone || existing.phone,
      status || existing.status,
      qr_code || existing.qr_code,
      access_group_id || existing.access_group_id,
      id,
    ]
  );

  return result.rows[0];
}; */
