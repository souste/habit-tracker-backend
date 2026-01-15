const { Router } = require("express");
const router = Router();

const {
  getHabitsController,
  createHabitController,
  updateHabitController,
  deleteHabitController,
} = require("../controllers/habitsController");
const { requireAuth } = require("../middleware/requireAuth");

router.use(requireAuth);

router.get("/", getHabitsController);
router.post("/", createHabitController);
router.patch("/:id", updateHabitController);
router.delete("/:id", deleteHabitController);

module.exports = router;
