const express = require("express");
const router = express.Router();
const {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  getCoursesBySkill
} = require("../Controllers/courseController");

// Get all courses (with optional query params: ?skillID=xxx&difficultyLevel=Beginner)
router.get("/", getAllCourses);

// Get courses by skillID
router.get("/skill/:skillID", getCoursesBySkill);

// Get a single course by ID
router.get("/:id", getCourseById);


// Create a new course
router.post("/", createCourse);

// Update a course
router.put("/:id", updateCourse);

// Delete a course
router.delete("/:id", deleteCourse);

module.exports = router;

