const { Router } = require("express");
const router = Router();

const { getCheckinsController, createCheckinController } = require("../controllers/checkinsController");

const { requireAuth } = require("../middleware/requireAuth");

router.use(requireAuth);

router.get("/:habitId", getCheckinsController);
router.post("/", createCheckinController);

module.exports = router;
