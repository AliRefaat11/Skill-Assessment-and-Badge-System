const express = require('express');
const {
  createAssessment,
  getAssessments,
  getAssessmentById,
  updateAssessment,
  deleteAssessment
} = require('../controllers/assessmentController');

const router = express.Router();

router.route('/')
  .post(createAssessment)
  .get(getAssessments);

router.route('/:id')
  .get(getAssessmentById)
  .put(updateAssessment)
  .delete(deleteAssessment);

module.exports = router;
