const learnerSkillController = require('../Controllers/learnerSkillController');
const express = require('express');
const router = express.Router();

router.get('/', learnerSkillController.getAllLearnerSkills);
router.get('/skill/:skillID', learnerSkillController.getAllSkillLearners);
router.get('/learner/:learnerID', learnerSkillController.getAllSkillsByLearner);
router.post('/assign', learnerSkillController.assignSkillToLearner);

module.exports = router;