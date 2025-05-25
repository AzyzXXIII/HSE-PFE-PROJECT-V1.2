import { pool } from "../config/db.js";

export const getAllEvents = async () => {
  const result = await pool.query("SELECT * FROM calendar ORDER BY start ASC");
  return result.rows;
};

export const createEvent = async ({ title, start }) => {
  const result = await pool.query(
    "INSERT INTO calendar (title, start) VALUES ($1, $2) RETURNING *",
    [title, start]
  );
  return result.rows[0];
};

export const deleteEvent = async (id) => {
  await pool.query("DELETE FROM calendar WHERE id = $1", [id]);
};
