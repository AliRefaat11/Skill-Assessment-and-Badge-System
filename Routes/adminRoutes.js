const express = require("express");
const router = express.Router();
const adminDashboardController = require("../Controllers/adminDashboardController");
const { auth, allowedTo } = require('../Services/authService');

// Dashboard + pages
router.get("/admin", (req, res) => res.redirect("/admin/dashboard"));
router.get("/admin/dashboard", auth, allowedTo("Admin"), adminDashboardController.getDashboardPage);
// Pages
router.get("/admin/skills", auth, allowedTo("Admin"), adminDashboardController.getSkillsPage);
// IMPORTANT: put /new before any :id (if you later add /admin/skills/:id page)
router.get("/admin/skills/new", auth, allowedTo("Admin"), adminDashboardController.getCreateSkillPage);


// nested navigation pages
router.get("/admin/skills/:skillId/assessments", auth, allowedTo("Admin"), adminDashboardController.getAssessmentsPage);
router.get("/admin/skills/:skillId/assessments/new", auth, allowedTo("Admin"), adminDashboardController.getCreateAssessmentPage);

router.get("/admin/assessments/:assessmentId/questions", auth, allowedTo("Admin"), adminDashboardController.getQuestionsPage);
router.get("/admin/assessments/:assessmentId/questions/new", auth, allowedTo("Admin"), adminDashboardController.getCreateQuestionPage);
router.get("/admin/users", auth, allowedTo("Admin"), adminDashboardController.getUsersPage);
router.get("/admin/instructors", auth, allowedTo("Admin"), adminDashboardController.getInstructorsPage);

module.exports = router;
