const { findUserByUsernameOrEmail, createUser } = require("../models/usersModel");
const bcrypt = require("bcrypt");

const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    const existingUser = await findUserByUsernameOrEmail(username, email);

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with that username or email already exists",
      });
    }

    const user = await createUser({ username, email, passwordHash });

    res.status(201).json({
      success: true,
      data: { user },
      message: "User created successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// const login = async (res, res) => {
// const {email, password} = req.body;
// }

module.exports = {
  signUp,
};
