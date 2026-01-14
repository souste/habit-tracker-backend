const { getHabitsByUser } = require("../models/habitsModel");

const getHabits = async (req, res) => {
  try {
    const userId = req.user.id;

    const habits = await getHabitsByUser(userId);

    res.status(200).json({
      status: true,
      data: habits,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  getHabits,
};
