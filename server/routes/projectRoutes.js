const express = require("express");
const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const {
  createProject,
  getProjects,
} = require("../controllers/projectController");

const router = express.Router();

router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  createProject
);

router.get(
  "/",
  protect,
  getProjects
);

module.exports = router;