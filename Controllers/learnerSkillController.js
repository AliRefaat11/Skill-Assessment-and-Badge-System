const learnerSkillModel = require('../Models/learnerSkillModel');

// Controller to get all learner skills
exports.getAllLearnerSkills = async (req, res) => {
  try {
    const learnerSkills = await learnerSkillModel.find();
    res.status(200).json({
      success: true,
        data: learnerSkills
    });
  } catch (error) {
    res.status(500).json({
      success: false,   
        message: 'Error fetching learner skills',
        error: error.message
    });
  }
};

exports.getAllSkillLearners = async (req, res) => {
    try {
        const { skillID } = req.params;
        const learnerSkills = await learnerSkillModel.find({ skillID });
        res.status(200).json({
            success: true,
            data: learnerSkills
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching skill learners',
            error: error.message
        });
    }
};

exports.assignSkillToLearner = async (req, res) => {
  try {
    const { learnerID, skillID } = req.body;
    const newLearnerSkill = await learnerSkillModel.create({ learnerID, skillID });
    res.status(201).json({
      success: true,
        data: newLearnerSkill
    });
  } catch (error) {
    res.status(500).json({
      success: false,
        message: 'Error assigning skill to learner',
        error: error.message
    });
  }
};

exports.deleteLearnerSkill = async (req, res) => {
  try {
    const { id } = req.params;  
    const deleted = await learnerSkillModel.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Learner skill not found' });
    }
    res.status(200).json({ success: true, message: 'Learner skill deleted' });
    } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting learner skill',
        error: error.message
    });
  }
};