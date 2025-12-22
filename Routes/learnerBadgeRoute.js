const learnerBadgeController = require('../Controllers/learnerBadgeController');
const express = require('express');
const router = express.Router();

router.get('/', learnerBadgeController.getAllLearnerBadges);
router.get('/:id', learnerBadgeController.getLearnerBadgeById);
router.post('/', learnerBadgeController.createLearnerBadge);
router.get('/learner/:learnerId', learnerBadgeController.getAllBadgesByLearner);
router.get('/badge/:badgeId', learnerBadgeController.getallLearnersByBadge);

module.exports = router;