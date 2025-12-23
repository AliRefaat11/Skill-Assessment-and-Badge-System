const learnerBagde = require('../models/learnerBadgeModel');

exports.getAllLearnerBadges = async (req, res) => {
    try {
        const badges = await learnerBagde.find();
        res.status(200).json(badges);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getLearnerBadgeById = async (req, res) => {
    try {
        const badge = await learnerBagde.findById(req.params.id);
        if (!badge) {
            return res.status(404).json({ message: 'Badge not found' });
        }   
        res.status(200).json(badge);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }   
};

exports.createLearnerBadge = async (req, res) => {
    try {
        const newBadge = new learnerBagde(req.body);
        const savedBadge = await newBadge.save();
        res.status(201).json(savedBadge);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllBadgesByLearner = async (req, res) => {
    try {
        const badges = await learnerBagde.find({ LearnerID: req.params.learnerId });
        res.status(200).json(badges);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getallLearnersByBadge = async (req, res) => {
    try {
        const learners = await learnerBagde.find({ BadgeID: req.params.badgeId });
        res.status(200).json(learners);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};