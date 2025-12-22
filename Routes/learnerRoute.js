const express = require("express");
const {
    getAllLearners,
    renderprofile, 
    deleteLearner, 
    getLearnerByUserId
} = require("../Controllers/learnerController"); 
const learnerSkillController = require("../Controllers/learnerSkillController");
const { auth, allowedTo } = require('../Services/authService');

const router = express.Router();

router.get("/", allowedTo("Admin"), auth, getAllLearners);
router.get("/profile", auth, allowedTo("Learner"), renderprofile);
router.get("/:id", auth, getLearnerByUserId);
router.delete("/:id", auth, deleteLearner);


module.exports = router;