const express = require("express");
const {
    getAllLearners, 
    getLearnerById,
    createLearner,} = require("../Controllers/learnerController");
const { auth, allowedTo } = require('../Services/authService');

const router = express.Router();

router.get("/", allowedTo("Admin"), auth, getAllLearners);
router.get("/:id", auth, getLearnerById);
router.post("/", auth, createLearner);

module.exports = router;