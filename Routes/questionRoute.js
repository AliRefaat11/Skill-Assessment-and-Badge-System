const express = require('express');
const {
  createQuestion,
  getQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
  getQuestionsByAssessment
} = require('../controllers/questionController');

const router = express.Router();

/*
  IMPORTANT:
  Specific routes MUST come before :id
*/

// Get questions by assessment
router.get('/assessment/:assessmentId', getQuestionsByAssessment);

// Collection routes
router.route('/')
  .post(createQuestion)
  .get(getQuestions);

// Single question routes
router.route('/:id')
  .get(getQuestionById)
  .put(updateQuestion)
  .delete(deleteQuestion);

module.exports = router;
