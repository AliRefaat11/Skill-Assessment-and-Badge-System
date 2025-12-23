const Question = require("../Models/questionsModel");
const Assessment = require("../Models/assesmentModel");

exports.createQuestion = async (req, res, next) => {
  try {
    const { assessmentId, type, text, points, correctAnswer } = req.body;

    const assessment = await Assessment.findById(assessmentId);
    if (!assessment) {
      return res.status(404).json({ success: false, message: "Assessment not found" });
    }

    const question = await Question.create({
      assessmentId,
      type,
      text,
      points,
      options: req.body.options || [],
      correctAnswer
    });

    // increment totalQuestions
    assessment.totalQuestions += 1;
    await assessment.save();

    res.status(201).json({ success: true, data: question });
  } catch (err) {
    next(err);
  }
};


// GET /api/admin/questions
exports.getQuestions = async (req, res, next) => {
  try {
    const questions = await Question.find()
      .populate("assessmentId", "courseId")
      .sort({ createdAt: -1 });

    res.json({ success: true, data: questions });
  } catch (err) {
    next(err);
  }
};


// GET /api/admin/questions/:id
exports.getQuestionById = async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({ success: false, message: "Question not found" });
    }

    res.json({ success: true, data: question });
  } catch (err) {
    next(err);
  }
};


// PUT /api/admin/questions/:id
exports.updateQuestion = async (req, res, next) => {
  try {
    const { type, text, points, options, correctAnswer } = req.body;

    const question = await Question.findByIdAndUpdate(
      req.params.id,
      { type, text, points, options, correctAnswer },
      { new: true, runValidators: true }
    );

    if (!question) {
      return res.status(404).json({ success: false, message: "Question not found" });
    }

    res.json({ success: true, data: question });
  } catch (err) {
    next(err);
  }
};


// DELETE /api/admin/questions/:id
exports.deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    const q = await Question.findById(id);
    if (!q) return res.status(404).json({ message: "Question not found" });

    await Question.findByIdAndDelete(id);

    res.status(200).json({ message: "Question deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// GET /api/admin/assessments/:assessmentId/questions
exports.getQuestionsByAssessment = async (req, res, next) => {
  try {
    const { assessmentId } = req.params;
    const questions = await Question.find({ assessmentId: assessmentId }).sort({ createdAt: -1 });
    res.json({ success: true, data: questions });
  } catch (err) {
    next(err);
  }
};
