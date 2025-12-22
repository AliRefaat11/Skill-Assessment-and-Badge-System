const express = require("express");
const router = express.Router();

const {
  getDashboardMetrics
} = require("../Controllers/dashboardController");

// Dashboard main page (EJS)
router.get("/dashboard", (req, res) => {
  res.render("admin/dashboard", {
    title: "Dashboard"
  });
});

// Dashboard metrics API (JSON)
router.get("/dashboard/metrics", getDashboardMetrics);

module.exports = router;
