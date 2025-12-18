const express = require("express");
const {
    getAllLearners,
    getLearnerById,
    createLearner,
    renderprofile, 
    deleteLearner } = require("../Controllers/learnerController");    
const { auth, allowedTo } = require('../Services/authService');

const router = express.Router();

router.get("/", allowedTo("Admin"), auth, getAllLearners);
router.get("/profile", auth, allowedTo("Learner"), renderprofile);
router.get("/:id", auth, getLearnerById);
router.post("/", auth, createLearner);
router.delete("/:id", auth, deleteLearner);
module.exports = router;