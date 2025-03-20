import pg from "pg";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables at the beginning

const { Pool } = pg; // Extract Pool from pg

console.log("User:", process.env.DB_USERNAME); // Debugging

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

export default pool;
