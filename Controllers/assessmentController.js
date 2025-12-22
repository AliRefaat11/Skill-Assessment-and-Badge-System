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


exports.getAssessmentsBySkill = async (req, res, next) => {
  try {
    const { skillId } = req.params;
    const assessmentsBySkill = await Assessment.find({ skillId })
      .populate("skillId", "name")
      .sort({ createdAt: -1 });

    res.json({ success: true, data: assessmentsBySkill });
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

exports.deleteAssessment = async (req, res, next) => {
  try {
    const assessment = await Assessment.findById(req.params.id);
    if (!assessment) {
      return res.status(404).json({ success: false, message: "Assessment not found" });
    }

    await Question.deleteMany({ assessmentId: assessment._id });
    await assessment.deleteOne();

    res.json({ success: true, message: "Assessment and its questions deleted" });
  } catch (err) {
    next(err);
  }
};

exports.getAssessmentsBySkill=async (req, res, next) => {
  try {
    const { skillId } = req.params;
    const assessments = await Assessment.find({ skillId })
      .populate("skillId", "name")
      .sort({ createdAt: -1 });
    res.json({ success: true, data: assessments });
  } catch (err) {
    next(err);
  } 
};