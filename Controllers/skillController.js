const Skill = require('../Models/skillModel');
const Assessment = require("../Models/assesmentModel");
const Question = require("../Models/questionsModel");

exports.createSkill = async (req, res) => {
    try {
        const { skillName, category, description, difficultyLevel } = req.body;

        const skill = new Skill({
            skillName,
            category,
            description,
            difficultyLevel
        });

        await skill.save(); 
        return res.status(201).json(skill);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

exports.getSkills = async (req, res) => {
    try {
        console.log('Fetching skills from database...');
        const skills = await Skill.find();
        console.log('Skills fetched:', skills);
        return res.status(200).json({ success: true, data: skills });
    } catch (err) {
        console.error('Error fetching skills:', err);
        return res.status(500).json({ success: false, error: err.message });
    }
};

exports.getSkillById = async (req, res) => {
    try {
        const skill = await Skill.findById(req.params.id);
        if (!skill) return res.status(404).json({ error: 'Skill not found' });
        return res.status(200).json(skill);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

 exports.updateSkill = async (req, res) => {
    try {
        const updated = await Skill.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updated) return res.status(404).json({ error: 'Skill not found' });
        return res.status(200).json(updated);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};


exports.deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;

    const skill = await Skill.findById(id);
    if (!skill) return res.status(404).json({ message: "Skill not found" });

    // find all assessments under this skill
    const assessments = await Assessment.find({ skillId: id }).select("_id");
    const assessmentIds = assessments.map(a => a._id);

    // delete questions under those assessments
    if (assessmentIds.length) {
      await Question.deleteMany({ assessmentId: { $in: assessmentIds } });
    }

    // delete assessments
    await Assessment.deleteMany({ skillId: id });

    // delete skill
    await Skill.findByIdAndDelete(id);

    res.status(200).json({ message: "Skill deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
