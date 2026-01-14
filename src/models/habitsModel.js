const pool = require("../db/pool");

async function getHabitsByUser(userId) {
  const result = await pool.query(`SELECT * FROM habits WHERE user_id = $1`, [userId]); // ORDER BY ID

  return result.rows;
}

async function createHabit(name, userId) {
  const result = await pool.query(
    `INSERT INTO habits (name, user_id) VALUES ($1, $2) RETURNING id, name, frequency_per_week, user_id`,
    [name, userId]
  );

  return result.rows[0];
}

async function updateHabit(id, name, userId) {
  const result = await pool.query(
    `UPDATE habits SET name = $1 WHERE id = $2 AND user_id = $3 RETURNING id, name, frequency_per_week, user_id`,
    [name, id, userId]
  );

  return result.rows[0];
}

async function deleteHabit(id, userId) {
  const result = await pool.query(`DELETE FROM habits WHERE id = $1 AND user_id = $2`, [id, userId]);

  return result.rows[0];
}

module.exports = {
  getHabitsByUser,
  createHabit,
  updateHabit,
  deleteHabit,
};
