const { getHabitsByUserModel, createHabitModel, updateHabitModel, deleteHabitModel } = require("../models/habitsModel");

const getHabitsController = async (req, res) => {
  try {
    const userId = req.user.id;

    const habits = await getHabitsByUserModel(userId);

    res.status(200).json({
      success: true,
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

const createHabitController = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        error: "Bad request",
        message: "Habit must contain a name",
      });
    }

    const result = await createHabitModel(name, userId);

    res.status(201).json({
      success: true,
      data: result,
      message: "Habit created successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const updateHabitController = async (req, res) => {
  try {
    const userId = req.user.id;
    const id = req.params.id;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        error: "Bad request",
        message: "Habit must contain a name",
      });
    }

    const updated = await updateHabitModel(id, name, userId);

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Habit not found",
      });
    }

    res.status(200).json({
      success: true,
      data: updated,
      message: "Habit updated successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const deleteHabitController = async (req, res) => {
  try {
    const userId = req.user.id;
    const id = req.params.id;

    const deleted = await deleteHabitModel(id, userId);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Habit not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Habit deleted successfully",
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
  getHabitsController,
  createHabitController,
  updateHabitController,
  deleteHabitController,
};
