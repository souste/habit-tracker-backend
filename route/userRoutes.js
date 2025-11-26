const pool = require("../db/pool");
const { Router } = require("express");
const router = Router();

router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM users`);
    res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (err) {
    console.error("Could not fetch users", err);

    res.status(500).json({
      success: false,
      message: "Server error fetching users",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { first_name, last_name, username, email, password } = req.body;
    if (!first_name || !last_name || !username || !email || !password) {
      return res.status(400).json({
        error: "Bad request",
        message: "All fields must be entered",
      });
    }

    const userExists = await pool.query(
      `
        SELECT * FROM users WHERE username = $1 or email = $2`,
      [username, email]
    );

    if (userExists.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "User with that username or email already exists",
      });
    }

    const result = await pool.query(
      `
            INSERT INTO users (first_name, last_name, username, email, password) 
            VALUES ($1, $2, $3, $4, $5) 
            RETURNING *`,
      [first_name, last_name, username, email, password]
    );

    const user = result.rows[0];
    delete user.password;

    res.status(201).json({
      success: true,
      data: user,
      message: "User created successfully",
    });
  } catch (err) {
    console.error("Could not create user", err);

    res.status(500).json({
      success: false,
      message: "Server error creating user",
    });
  }
});

module.exports = router;
