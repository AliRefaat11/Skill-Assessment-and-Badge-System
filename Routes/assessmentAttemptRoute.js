const assessmentAttemptController = require('../Controllers/assessmentAttemptController');
const express = require('express');
const router = express.Router();

router.get('/:id', assessmentAttemptController.getAttemptById);
router.get('/', assessmentAttemptController.getAllAttempts);
router.get('/assessment/:assessmentId', assessmentAttemptController.getAttemptsByAssessment);
router.get('/learner/:learnerId', assessmentAttemptController.getAttemptsByLearner);
router.post('/', assessmentAttemptController.createAttempt);
router.get('/learner/:learnerId/assessment/:assessmentId', assessmentAttemptController.getAttemptByLearnerAndAssessment);

module.exports = router;