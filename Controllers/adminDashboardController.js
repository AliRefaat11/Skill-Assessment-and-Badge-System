// controllers/adminDashboardController.js

const User = require("../Models/userModel");
const Course = require("../Models/courseModel");
const Assessment = require("../Models/assesmentModel");
const Question = require("../Models/questionsModel");
const Learner = require("../Models/learnerModel");

// -----------------------------
// Helpers
// -----------------------------
async function buildStats() {
  const [totalUsers, totalCourses, totalQuizzes, activeUsers] = await Promise.all([
    User.countDocuments(),
    Course.countDocuments(),
    Assessment.countDocuments(), // "quizzes" in UI = assessments
    Learner.countDocuments() // "activeUsers" (simple version)
  ]);

  return { totalUsers, totalCourses, totalQuizzes, activeUsers };
}

// -----------------------------
// Render Pages (EJS)
// -----------------------------

exports.getDashboardPage = async (req, res, next) => {
  try {
    const stats = await buildStats();

    res.render("admin/dashboard", {
      activeTab: "dashboard",
      stats
    });
  } catch (err) {
    next(err);
  }
};

exports.getCoursesPage = async (req, res, next) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });

    res.render("admin/courses", {
      activeTab: "courses",
      courses
    });
  } catch (err) {
    next(err);
  }
};

exports.getAssessmentsPage = async (req, res, next) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).render("admin/assessments", {
        activeTab: "courses",
        course: null,
        assessments: [],
        error: "Course not found"
      });
    }

    const assessments = await Assessment.find({ courseId })
      .sort({ createdAt: -1 });

    res.render("admin/assessments", {
      activeTab: "courses",
      course,
      assessments,
      error: null
    });
  } catch (err) {
    next(err);
  }
};

exports.getQuestionsPage = async (req, res, next) => {
  try {
    const { assessmentId } = req.params;

    const assessment = await Assessment.findById(assessmentId).populate("courseId", "name");
    if (!assessment) {
      return res.status(404).render("admin/questions", {
        activeTab: "courses",
        assessment: null,
        questions: [],
        error: "Assessment not found"
      });
    }

    const questions = await Question.find({ assessmentId }).sort({ createdAt: -1 });

    res.render("admin/questions", {
      activeTab: "courses",
      assessment,
      questions,
      error: null
    });
  } catch (err) {
    next(err);
  }
};

exports.getUsersPage = async (req, res, next) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });

    res.render("admin/users", {
      activeTab: "users",
      users
    });
  } catch (err) {
    next(err);
  }
};

exports.getInstructorsPage = async (req, res, next) => {
  try {
    // Assumes you store role in User (like your ERD: User has Role)
const instructors = await User.find({ Role: "instructor" }).sort({ createdAt: -1 });

    res.render("admin/instructors", {
      activeTab: "instructors",
      instructors
    });
  } catch (err) {
    next(err);
  }
};

// -----------------------------
// Backward compatibility (your old route used getDashboard)
// If any old code still calls adminDashboardController.getDashboard
// -----------------------------
exports.getDashboard = exports.getDashboardPage;
