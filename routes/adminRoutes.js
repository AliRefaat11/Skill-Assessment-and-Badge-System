const express = require("express");
const router = express.Router();

const { protect, adminOnly } = require("../middleware/authMiddleware");

const assessmentController = require("../controllers/assessmentController");
const questionController = require("../controllers/questionController");

// All these routes are admin protected
router.use(protect, adminOnly);

// -------------------------
// ASSESSMENT ROUTES
// -------------------------

// Create assessment
router.post("/assessments", assessmentController.createAssessment);

// Get all assessments
router.get("/assessments", assessmentController.getAssessments);

// Get single assessment
router.get("/assessments/:id", assessmentController.getAssessmentById);

// Update assessment
router.put("/assessments/:id", assessmentController.updateAssessment);

// Delete assessment (also deletes its questions)
router.delete("/assessments/:id", assessmentController.deleteAssessment);

// -------------------------
// QUESTION ROUTES
// -------------------------

// Create question
router.post("/questions", questionController.createQuestion);

// Get all questions
router.get("/questions", questionController.getQuestions);

// Get single question
router.get("/questions/:id", questionController.getQuestionById);

// Update question
router.put("/questions/:id", questionController.updateQuestion);

// Delete question
router.delete("/questions/:id", questionController.deleteQuestion);

// Get all questions for a specific assessment
router.get(
  "/assessments/:assessmentId/questions",
  questionController.getQuestionsByAssessment
);

module.exports = router;
