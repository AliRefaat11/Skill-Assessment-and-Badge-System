const learnerBadgeModel = require('../models/learnerBadgeModel');
const badgeModel = require('../models/badgeModel');

exports.getAllLearnerBadges = async (req, res) => {
    try {
        const badges = await learnerBadgeModel.find();
        res.status(200).json(badges);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getLearnerBadgeById = async (req, res) => {
    try {
        const badge = await learnerBadgeModel.findById(req.params.id);
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
        const newBadge = new learnerBadgeModel(req.body);
        const savedBadge = await newBadge.save();
        res.status(201).json(savedBadge);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllBadgesByLearner = async (req, res) => {
    try {
        const { learnerId } = req.params;
        const learnerbadges = await learnerBadgeModel.find({ learnerId });
        const badges = await badgeModel.find({ _id: { $in: learnerbadges.map(lb => lb.badgeID) } });
        res.status(200).json({
            success: true,
            data: badges
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getallLearnersByBadge = async (req, res) => {
    try {
        const learners = await learnerBadge.find({ badgeID: req.params.badgeId });
        res.status(200).json(learners);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};