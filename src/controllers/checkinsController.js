const { getCheckinsForHabitModel, createCheckinModel } = require("../models/checkinsModel");

const getCheckinsController = async (req, res) => {
  try {
    const userId = req.user.id;
    const { habitId } = req.params;

    const checkins = await getCheckinsForHabitModel(habitId, userId);

    return res.status(200).json({
      success: true,
      data: checkins,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const createCheckinController = async (req, res) => {
  try {
    const userId = req.user.id;
    const { habitId } = req.body;

    if (!habitId) {
      return res.status(400).json({
        success: false,
        message: "habitId is required",
      });
    }

    const created = await createCheckinModel(habitId, userId);

    if (!created) {
      return res.status(404).json({
        success: false,
        message: "Habit not found",
      });
    }

    res.status(201).json({
      success: true,
      data: created,
    });
  } catch (err) {
    if (err.code === "23505") {
      return res.status(409).json({
        success: false,
        message: "Already checked in today",
      });
    }

    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  getCheckinsController,
  createCheckinController,
};
