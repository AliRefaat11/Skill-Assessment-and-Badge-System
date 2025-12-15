const express = require("express");
const router = express.Router();
const {
  getAllCertificates,
  getCertificateById,
  getCertificatesByLearner,
  getCertificatesByCourse,
  createCertificate,
  updateCertificate,
  deleteCertificate,
} = require("../Controllers/certificateController");

// Public routes
router.get("/", getAllCertificates);
router.get("/:id", getCertificateById);
router.get("/learner/:learnerId", getCertificatesByLearner);
router.get("/course/:courseId", getCertificatesByCourse);

// Admin routes
router.post("/", createCertificate);
router.put("/:id", updateCertificate);
router.delete("/:id", deleteCertificate);

module.exports = router;
