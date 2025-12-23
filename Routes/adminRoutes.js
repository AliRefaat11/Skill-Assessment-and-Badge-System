const express = require("express");
const router = express.Router();
const adminDashboardController = require("../Controllers/adminDashboardController");

// Dashboard + pages
router.get("/admin", (req, res) => res.redirect("/admin/dashboard"));
router.get("/admin/dashboard", adminDashboardController.getDashboardPage);

// Pages
router.get("/admin/skills", adminDashboardController.getSkillsPage);
// IMPORTANT: put /new before any :id (if you later add /admin/skills/:id page)
router.get("/admin/skills/new", adminDashboardController.getCreateSkillPage);



// nested navigation pages
router.get("/admin/skills/:skillId/assessments", adminDashboardController.getAssessmentsPage);
router.get("/admin/skills/:skillId/assessments/new", adminDashboardController.getCreateAssessmentPage);

router.get("/admin/assessments/:assessmentId/questions", adminDashboardController.getQuestionsPage);
router.get("/admin/assessments/:assessmentId/questions/new", adminDashboardController.getCreateQuestionPage);

router.get("/admin/users", adminDashboardController.getUsersPage);

router.get("/admin/instructors", adminDashboardController.getInstructorsPage);

module.exports = router;
