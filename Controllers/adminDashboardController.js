const Skill = require("../Models/skillModel");
const Assessment = require("../Models/assesmentModel");
const Question = require("../Models/questionsModel");

exports.getDashboardPage = (req, res, next) => {
  try {
    res.render("admin/dashboard", {
      activeTab: "dashboard"
    });
  } catch (err) {
    next(err);
  }
};

exports.getSkillsPage = (req, res, next) => {
  try {
    res.render("admin/skills", {
      activeTab: "skills"
    });
  } catch (err) {
    next(err);
  }
};

exports.getAssessmentsPage = async (req, res, next) => {
  try {
    const { skillId } = req.params;

    const skill = await Skill.findById(skillId);
    if (!skill) {
      return res.status(404).render("admin/assessment", {
        activeTab: "skills",
        skill: null,
        assessments: [],
        error: "Skill not found"
      });
    }

    res.render("admin/assessment", {
      activeTab: "skills",
      skill,
      assessments: [], // Data will be loaded via API
      error: null
    });
  } catch (err) {
    next(err);
  }
};

exports.getQuestionsPage = async (req, res, next) => {
  try {
    const { assessmentId } = req.params;

    const assessment = await Assessment.findById(assessmentId).populate("skillId", "name");
    if (!assessment) {
      return res.status(404).render("admin/questions", {
        activeTab: "skills",
        assessment: null,
        questions: [],
        error: "Assessment not found"
      });
    }

    const questions = await Question.find({ assessmentId }).sort({ createdAt: -1 });

   res.render("admin/questions", {
  activeTab: "skills",
  assessment,
  assessmentId,
  questions: [], // Data will be loaded via API
  error: null
});

  } catch (err) {
    next(err);
  }
};

exports.getUsersPage = async (req, res, next) => {
  try {
    res.render("admin/users", {
      activeTab: "users",
      users: [] // Data will be loaded via API
    });
  } catch (err) {
    next(err);
  }
};

exports.getInstructorsPage = async (req, res, next) => {
  try {
    res.render("admin/instructors", {
      activeTab: "instructors",
      instructors: [] // Data will be loaded via API
    });
  } catch (err) {
    next(err);
  }
};

exports.getCreateAssessmentPage = async (req, res, next) => {
  try {
    const { skillId } = req.params;

    const skill = await Skill.findById(skillId);
    if (!skill) {
      return res.status(404).render("admin/assessment-create", {
        activeTab: "skills",
        skill: null,
        skillId,
        error: "Skill not found"
      });
    }

    res.render("admin/assessment-create", {
      activeTab: "skills",
      skill,
      skillId,
      error: null
    });
  } catch (err) {
    next(err);
  }
};

exports.getCreateSkillPage = async (req, res, next) => {
  try {
    res.render("admin/skill-create", {
      activeTab: "skills",
      error: null
    });
  } catch (err) {
    next(err);
  }
};

exports.getCreateQuestionPage = async (req, res, next) => {
  try {
    const { assessmentId } = req.params;

    const assessment = await Assessment.findById(assessmentId).populate("skillId", "name");
    if (!assessment) {
      return res.status(404).render("admin/questions", {
        activeTab: "skills",
        assessment: null,
        questions: [],
        error: "Assessment not found"
      });
    }

    res.render("admin/question-create", {
      activeTab: "skills",
      assessment,
      assessmentId,
      error: null
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
