const pool = require("../db/pool");

async function findUserByEmail(email) {
  const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);

  return result.rows[0];
}

async function createUser({ username, email, passwordHash }) {
  const result = await pool.query(
    `INSERT INTO users (userName, email, password) VALUES ($1, $2, $3) RETURNING id, username, email, created_at`,
    [username, email, passwordHash]
  );
  return result.rows[0];
}

module.exports = {
  findUserByEmail,
  createUser,
};
