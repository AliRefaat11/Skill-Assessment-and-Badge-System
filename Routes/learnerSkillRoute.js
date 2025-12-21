const learnerSkillController = require('../Controller/learnerSkillController');
const express = require('express');
const router = express.Router();

router.get('/', learnerSkillController.getAllLearnerSkills);
router.get('/skill/:skillID', learnerSkillController.getAllSkillLearners);
router.post('/assign', learnerSkillController.assignSkillToLearner);

module.exports = router;