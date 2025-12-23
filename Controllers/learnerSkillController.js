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
    
    // Check if skill is already assigned to this learner
    const existing = await learnerSkillModel.findOne({ learnerID, skillID });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'Skill is already assigned to this learner',
        data: existing
      });
    }
    
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

exports.getAllSkillsByLearner = async (req, res) => {
    try {
        const { learnerID } = req.params;
        const learnerSkills = await learnerSkillModel.find({ learnerID }).populate('skillID');
        
        // Transform the data to include skill details
        const skillsWithDetails = learnerSkills.map(ls => {
            const skill = ls.skillID;
            return {
                _id: ls._id,
                learnerID: ls.learnerID,
                skillID: skill?._id || ls.skillID,
                skillName: skill?.skillName || skill?.name || 'Unknown Skill',
                description: skill?.description || '',
                category: skill?.category || '',
                difficultyLevel: skill?.difficultyLevel || 'Beginner',
                createdAt: ls.createdAt,
                updatedAt: ls.updatedAt
            };
        });
        
        res.status(200).json({
            success: true,
            data: skillsWithDetails
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching learner skills',
            error: error.message
        });
    }
};