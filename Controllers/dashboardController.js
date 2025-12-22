const User = require("../Models/userModel");
const Skill = require("../Models/skillModel");
const Assessment = require("../Models/assesmentModel");
const Question = require("../Models/questionsModel");

exports.getDashboardMetrics = async (req, res) => {
  try {
    // ===== BASIC COUNTS =====
    const [users, skills, assessments, questions] = await Promise.all([
      User.countDocuments(),
      Skill.countDocuments(),
      Assessment.countDocuments(),
      Question.countDocuments()
    ]);

    // ===== CHART DATA =====
    const assessmentsByStatus = await Assessment.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);

    const questionsByType = await Question.aggregate([
      { $group: { _id: "$type", count: { $sum: 1 } } }
    ]);

    // ===== LATEST RECORDS =====
    const latestUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name email role createdAt");

    const latestSkills = await Skill.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name category createdAt");

    const latestAssessments = await Assessment.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("skillId", "name")
      .select("status totalMarks createdAt skillId");

    const latestQuestions = await Question.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("text type points createdAt");

    return res.status(200).json({
      status: "success",
      data: {
        totals: {
          users,
          skills,
          assessments,
          questions
        },
        charts: {
          assessmentsByStatus,
          questionsByType
        },
        latest: {
          users: latestUsers,
          skills: latestSkills,
          assessments: latestAssessments,
          questions: latestQuestions
        }
      }
    });
  } catch (error) {
    console.error("Dashboard metrics error:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to load dashboard metrics"
    });
  }
};
