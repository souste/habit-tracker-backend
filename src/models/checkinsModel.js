const pool = require("../db/pool");

async function getCheckinsForHabit(habitId, userId) {
  const result = await pool.query(
    `
    SELECT c.id, c.date_completed
    FROM checkins c
    JOIN habits h on h.id = c.habit_id
    WHERE c.habit_id = $1 AND h.user_id = $2
    ORDER BY c.date_completed`,
    [habitId, userId]
  );

  return result.rows;
}

async function createCheckin(habitId, userId) {
  const result = await pool.query(
    `
        INSERT INTO checkins (habit_id)
        SELECT h.id
        FROM habits h
        WHERE h.id = $1 AND h.user_id = $2
        RETURNING id, habit_id, date_completed`,
    [habitId, userId]
  );

  return result.rows[0];
}

module.exports = {
  getCheckinsForHabit,
  createCheckin,
};
