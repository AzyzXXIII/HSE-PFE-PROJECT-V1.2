import pool from "../config/db.js";

export const getAllEvents = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM calendar");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching events:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createEvent = async (req, res) => {
  const { title, start } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO calendar (title, start) VALUES ($1, $2) RETURNING *",
      [title, start]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error creating event:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM calendar WHERE id = $1", [id]);
    res.status(204).end();
  } catch (err) {
    console.error("Error deleting event:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { start } = req.body;

  try {
    const result = await pool.query(
      "UPDATE calendar SET start = $1 WHERE id = $2 RETURNING *",
      [start, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error updating event:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
