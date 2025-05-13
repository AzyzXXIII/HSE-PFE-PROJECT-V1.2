import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

pool.on("connect", () => {
  console.log("✅ Connected to PostgreSQL");
});

(async () => {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("✅ PostgreSQL Test Query:", res.rows[0]);
  } catch (error) {
    console.error("❌ PostgreSQL Connection Error:", error);
  }
})();

export default pool;
