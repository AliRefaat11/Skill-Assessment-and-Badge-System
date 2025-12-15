const express = require("express");
const router = express.Router();
const {
  getBadges,
  getBadgeById,
  getBadgesByCourse,
  createBadge,
  updateBadge,
  deleteBadge,
} = require("../Controllers/badgeController");

// Public routes
router.get("/", getBadges);
router.get("/:id", getBadgeById);
router.get("/course/:courseId", getBadgesByCourse);

// Admin routes
router.post("/", createBadge);
router.put("/:id", updateBadge);
router.delete("/:id", deleteBadge);

module.exports = router;
