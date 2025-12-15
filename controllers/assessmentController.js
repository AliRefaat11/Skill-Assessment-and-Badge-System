const Question = require("../Models/questionsModel");
const Assessment = require("../Models/assesmentModel");
const Course = require("../Models/courseModel");

// POST /api/admin/assessments
exports.createAssessment = async (req, res, next) => {
  try {
    const { courseId, durationMins, status, totalQuestions, grade } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    const assessment = await Assessment.create({
      courseId,
      durationMins,
      status: status || "not-started",
      totalQuestions: totalQuestions || 0,
      score: 0,
      grade: grade || ""
    });

    res.status(201).json({ success: true, data: assessment });
  } catch (err) {
    next(err);
  }
};


// GET /api/admin/assessments
exports.getAssessments = async (req, res, next) => {
  try {
    const assessments = await Assessment.find()
      .populate("courseId", "name")
      .sort({ createdAt: -1 });

    res.json({ success: true, data: assessments });
  } catch (err) {
    next(err);
  }
};


// GET /api/admin/assessments/:id
exports.getAssessmentById = async (req, res, next) => {
  try {
    const assessment = await Assessment.findById(req.params.id)
      .populate("courseId", "name");

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
exports.deleteAssessment = async (req, res, next) => {
  try {
    const assessment = await Assessment.findById(req.params.id);
    if (!assessment) {
      return res.status(404).json({ success: false, message: "Assessment not found" });
    }

    // Delete all questions belonging to this assessment
    await Question.deleteMany({ assessmentId: assessment._id });
    await assessment.deleteOne();

    res.json({ success: true, message: "Assessment and its questions deleted" });
  } catch (err) {
    next(err);
  }
};
