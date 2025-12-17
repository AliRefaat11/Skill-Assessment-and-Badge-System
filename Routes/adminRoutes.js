// routes/adminRoutes.js
const express = require("express");
const router = express.Router();

const adminDashboardController = require("../controllers/adminDashboardController");
const courseController = require("../controllers/courseController");
const assessmentController = require("../controllers/assessmentController");
const questionController = require("../controllers/questionController");
const userController = require("../Controllers/userController");

// Dashboard (EJS pages)
router.get("/admin", (req, res) => res.redirect("/admin/dashboard"));
router.get("/admin/dashboard", adminDashboardController.getDashboard);
// Pages
router.get("/admin/dashboard", adminDashboardController.getDashboardPage);
router.get("/admin/courses", adminDashboardController.getCoursesPage);

// nested navigation
router.get("/admin/courses/:courseId/assessments", adminDashboardController.getAssessmentsPage);
router.get("/admin/assessments/:assessmentId/questions", adminDashboardController.getQuestionsPage);
router.get("/admin/users", adminDashboardController.getUsersPage);
router.get("/admin/instructors", adminDashboardController.getInstructorsPage);

// Courses API (MongoDB)
router.get("/admin/courses", courseController.getAllCourses);
router.post("/admin/courses", courseController.createCourse);
router.get("/admin/courses/:id", courseController.getCourseById);
router.put("/admin/courses/:id", courseController.updateCourse);
router.delete("/admin/courses/:id", courseController.deleteCourse);

// Optional: courses by skill
router.get("/admin/skills/:skillID/courses", courseController.getCoursesBySkill);

// Assessments API
router.get("/admin/assessments", assessmentController.getAssessments);
router.post("/admin/assessments", assessmentController.createAssessment);
router.get("/admin/assessments/:id", assessmentController.getAssessmentById);
router.put("/admin/assessments/:id", assessmentController.updateAssessment);
router.delete("/admin/assessments/:id", assessmentController.deleteAssessment);

// Questions API
router.get("/admin/questions", questionController.getQuestions);
router.post("/admin/questions", questionController.createQuestion);
router.get("/admin/questions/:id", questionController.getQuestionById);
router.put("/admin/questions/:id", questionController.updateQuestion);
router.delete("/admin/questions/:id", questionController.deleteQuestion);

// Nested: questions by assessment
router.get(
  "/admin/assessments/:assessmentId/questions",
  questionController.getQuestionsByAssessment
);

// Users API (IMPORTANT: make sure this function exists in your userController)
router.get("/admin/users", userController.getAllUsers);

module.exports = router;
