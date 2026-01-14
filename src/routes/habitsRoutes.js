const { Router } = require("express");
const router = Router();

const { getHabits } = require("../controllers/habitsController");
const { requireAuth } = require("../middleware/requireAuth");

router.get("/", requireAuth, getHabits);

module.exports = router;
