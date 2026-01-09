const pool = require("./pool");

async function findUserByUsernameOrEmail(username, email) {
  const result = await pool.query(`SELECT * FROM users WHERE username = $1 or email = $2`, [username, email]);

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
  findUserByUsernameOrEmail,
  createUser,
};
