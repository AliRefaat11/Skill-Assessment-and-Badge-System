const assessmentAttemptController = require('../Controllers/assessmentAttemptController');
const express = require('express');
const router = express.Router();
const { auth, allowedTo } = require('../Services/authService');

// Public route for rendering attempt page (authentication will be checked in the page)
router.get('/start', assessmentAttemptController.renderAttemptPage);

// API routes (require authentication)
router.get('/:id', auth, assessmentAttemptController.getAttemptById);
router.get('/', auth, assessmentAttemptController.getAllAttempts);
router.get('/assessment/:assessmentId', auth, assessmentAttemptController.getAttemptsByAssessment);
router.get('/learner/:learnerId', auth, assessmentAttemptController.getAttemptsByLearner);
router.post('/', auth, assessmentAttemptController.createAttempt);
router.post('/start', auth, allowedTo('Learner'), assessmentAttemptController.startAttempt);
router.post('/submit', auth, allowedTo('Learner'), assessmentAttemptController.submitAttempt);
router.get('/learner/:learnerId/assessment/:assessmentId', auth, assessmentAttemptController.getAttemptByLearnerAndAssessment);

module.exports = router;