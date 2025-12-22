const Question = require("../Models/questionsModel");
const Assessment = require("../Models/assesmentModel");
const Skill = require("../Models/skillModel");


exports.createAssessment = async (req, res, next) => {
  try {
    console.log('createAssessment called with body:', req.body);
    const { skillId, duration, status, TotalMarks } = req.body;

    const skill = await Skill.findById(skillId);
    if (!skill) {
      return res.status(404).json({ success: false, message: "Skill not found" });
    }

    const assessment = await Assessment.create({
      skillId,
      duration,
      status: status || "not-started",
      TotalMarks: TotalMarks || 0
    });

    res.status(201).json({ success: true, data: assessment });
  } catch (err) {
    next(err);
  }
};



exports.getAssessments = async (req, res, next) => {
  try {

//
    const query = {};
    if (req.query.skillId) {
      query.skillId = req.query.skillId;
    }
//

    const assessments = await Assessment.find(query)
      .populate("skillId", "name")
      .sort({ createdAt: -1 });

    res.json({ success: true, data: assessments });
  } catch (err) {
    next(err);
  }
};


exports.getAssessmentById = async (req, res, next) => {
  try {
    const assessment = await Assessment.findById(req.params.id)
      .populate("skillId", "name");

    if (!assessment) {
      return res.status(404).json({ success: false, message: "Assessment not found" });
    }

    res.json({ success: true, data: assessment });
  } catch (err) {
    next(err);
  }
};

// PUT /api/admin/assessments/:id
exports.updateAssessment = async (req, res, next) => {
  try {
    const { durationMins, status, grade } = req.body;

    const assessment = await Assessment.findByIdAndUpdate(
      req.params.id,
      { durationMins, status, grade },
      { new: true, runValidators: true }
    );

    if (!assessment) {
      return res.status(404).json({ success: false, message: "Assessment not found" });
    }

    res.json({ success: true, data: assessment });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/admin/assessments/:id
exports.deleteAssessment = async (req, res) => {
  try {
    const { id } = req.params;

    const assessment = await Assessment.findById(id);
    if (!assessment) return res.status(404).json({ message: "Assessment not found" });

    await Question.deleteMany({ assessmentId: id });
    await Assessment.findByIdAndDelete(id);

    res.status(200).json({ message: "Assessment deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAssessmentsBySkill = async (req, res, next) => {
  try {
    const { skillId } = req.params;
    const assessments = await Assessment.find({ skillId }).sort({ createdAt: -1 });
    res.json({ success: true, data: assessments });
  } catch (err) {
    next(err);
  }
};
