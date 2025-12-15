// ...existing code...
const Skill = require('../Models/skillModel');

const createSkill = async (req, res) => {
    try {
        const skill = new Skill(req.body);
        await skill.save();
        return res.status(201).json(skill);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

const getSkills = async (req, res) => {
    try {
        const skills = await Skill.find();
        return res.status(200).json(skills);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

const getSkillById = async (req, res) => {
    try {
        const skill = await Skill.findById(req.params.id);
        if (!skill) return res.status(404).json({ error: 'Skill not found' });
        return res.status(200).json(skill);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

const updateSkill = async (req, res) => {
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

const deleteSkill = async (req, res) => {
    try {
        const deleted = await Skill.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: 'Skill not found' });
        return res.status(200).json({ message: 'Skill deleted' });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createSkill,
    getSkills,
    getSkillById,
    updateSkill,
    deleteSkill
};
