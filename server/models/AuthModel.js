import db from "../config/db.js";

const AuthModel = {
  findByEmail: async (email) => {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return result.rows[0];
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
