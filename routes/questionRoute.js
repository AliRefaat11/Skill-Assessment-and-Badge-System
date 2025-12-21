const express = require('express');
const {
  createQuestion,
  getQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
  getQuestionsByAssessment
} = require('../Controllers/questionController');
const { auth, allowedTo } = require('../Services/authService');

const router = express.Router();

router.route('/')
  .post(createQuestion)
  .get(getQuestions);
  
router.route('/assessment/:assessmentId')
  .get(getQuestionsByAssessment);

router.route('/:id')
  .get(getQuestionById)
  .put(updateQuestion)
  .delete(deleteQuestion);

module.exports = router;