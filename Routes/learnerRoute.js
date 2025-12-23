const express = require("express");
const {
    getAllLearners,
    getLearnerById,
    renderprofile, 
    deleteLearner, 
    getLearnerByUserId} = require("../Controllers/learnerController");    
const { auth, allowedTo } = require('../Services/authService');

const router = express.Router();

router.get("/", allowedTo("Admin"), auth, getAllLearners);
router.get("/profile", auth, allowedTo("Learner"), renderprofile);
router.get("/:id", auth, getLearnerByUserId);
router.delete("/:id", auth, deleteLearner);

module.exports = router;