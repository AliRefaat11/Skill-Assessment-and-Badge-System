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

router.route('/')
  .post(createQuestion)
  .get(getQuestions);

router.route('/:id')
  .get(getQuestionById)
  .put(updateQuestion)
  .delete(deleteQuestion);

router.route('/assessment/:assessmentId')
  .get(getQuestionsByAssessment);

module.exports = router;
