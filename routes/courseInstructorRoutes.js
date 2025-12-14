const express = require("express");
const router = express.Router();
const {
  getAllCourseInstructors,
  getCourseInstructorById,
  createCourseInstructor,
  updateCourseInstructor,
  deleteCourseInstructor,
  getInstructorsByCourse,
  getCoursesByInstructor
} = require("../controllers/courseInstructorController");

// Get all course-instructor relationships (with optional query params: ?courseID=xxx&instructorID=xxx)
router.get("/", getAllCourseInstructors);

// Get all instructors for a specific course
router.get("/course/:courseID", getInstructorsByCourse);

// Get all courses for a specific instructor
router.get("/instructor/:instructorID", getCoursesByInstructor);

// Get a single course-instructor relationship by ID
router.get("/:id", getCourseInstructorById);

// Create a new course-instructor relationship
router.post("/", createCourseInstructor);

// Update a course-instructor relationship
router.put("/:id", updateCourseInstructor);

// Delete a course-instructor relationship
router.delete("/:id", deleteCourseInstructor);

module.exports = router;

