const express = require("express");
const router = express.Router();

const {
  createAssessment,
  getAssessments,
  getAssessmentById,
  updateAssessment,
  deleteAssessment,
  getAssessmentsBySkill
} = require("../Controllers/assessmentController");

/*
  IMPORTANT:
  Specific routes must come before "/:id"
*/

// ✅ Get assessments by skill
router.get("/skill/:skillId", getAssessmentsBySkill);

// Collection routes
router.route("/")
  .post(createAssessment)
  .get(getAssessments);

// Single assessment routes
router.route("/:id")
  .get(getAssessmentById)
  .put(updateAssessment)
  .delete(deleteAssessment);

module.exports = router;
