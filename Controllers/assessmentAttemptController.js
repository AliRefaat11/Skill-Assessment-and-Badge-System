const assessmentAttempt = require('../models/assessmentAttemptModel');

exports.getAttemptById = async (req, res) => {
    try {
        const attempt = await assessmentAttempt.findById(req.params.id);
        if (!attempt) {
            return res.status(404).json({
                success: false,
                message: "Attempt not found"
            });
        }
        res.status(200).json({
            success: true,
            data: attempt
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.getAllAttempts = async (req, res) => {
    try {
        const attempts = await assessmentAttempt.find();
        res.status(200).json({
            success: true,
            count: attempts.length,
            data: attempts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.getAttemptsByAssessment = async (req, res) => {
    try {
        const attempts = await assessmentAttempt.find({ AssessmentID: req.params.assessmentId });
        res.status(200).json({
            success: true,
            count: attempts.length,
            data: attempts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.getAttemptsByLearner = async (req, res) => {
    try {
        const attempts = await assessmentAttempt.find({ LearnerID: req.params.learnerId }); 
        res.status(200).json({
            success: true,
            count: attempts.length,
            data: attempts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.createAttempt = async (req, res) => {
    try {
        const newAttempt = new assessmentAttempt(req.body);
        const savedAttempt = await newAttempt.save();
        res.status(201).json({
            success: true,
            data: savedAttempt
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.countAttempts = async (req, res) => {
    try {
        const count = await assessmentAttempt.countDocuments();
        res.status(200).json({
            success: true,
            count: count
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.countLearnerAttempts = async (req, res) => {
    try {
        const count = await assessmentAttempt.countDocuments({ LearnerID: req.params.learnerId });
        res.status(200).json({
            success: true,
            count: count
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.getAttemptByLearnerAndAssessment = async (req, res) => {
    try {
        const attempt = await assessmentAttempt.findOne({
            LearnerID: req.params.learnerId,
            AssessmentID: req.params.assessmentId
        });
        if (!attempt) {
            return res.status(404).json({
                success: false,
                message: "Attempt not found"
            });
        }
        res.status(200).json({
            success: true,
            data: attempt
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};