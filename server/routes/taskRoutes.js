const express = require("express");
const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const {
  createTask,
  getTasks,
  updateTaskStatus,
} = require("../controllers/taskController");

const router = express.Router();

router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  createTask
);

router.get(
  "/",
  protect,
  getTasks
);

router.put(
  "/:id/status",
  protect,
  updateTaskStatus
);

module.exports = router;