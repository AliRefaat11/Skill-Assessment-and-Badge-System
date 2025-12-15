const Certificate = require("../Models/certificateModel");

// @desc    Get all certificates
// @route   GET /api/certificates
// @access  Public
exports.getAllCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find()
      .populate("learnerId", "FirstName LastName Email")
      .populate("courseId", "Name Description");

    res.status(200).json({
      success: true,
      count: certificates.length,
      data: certificates,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get a single certificate by ID
// @route   GET /api/certificates/:id
// @access  Public
exports.getCertificateById = async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id)
      .populate("learnerId", "FirstName LastName Email")
      .populate("courseId", "Name Description");

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: "Certificate not found",
      });
    }

    res.status(200).json({
      success: true,
      data: certificate,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get certificates by Learner ID
// @route   GET /api/certificates/learner/:learnerId
// @access  Public
exports.getCertificatesByLearner = async (req, res) => {
  try {
    const certificates = await Certificate.find({
      learnerId: req.params.learnerId,
    })
      .populate("learnerId", "FirstName LastName Email")
      .populate("courseId", "Name Description");

    res.status(200).json({
      success: true,
      count: certificates.length,
      data: certificates,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get certificates by Course ID
// @route   GET /api/certificates/course/:courseId
// @access  Public
exports.getCertificatesByCourse = async (req, res) => {
  try {
    const certificates = await Certificate.find({
      courseId: req.params.courseId,
    })
      .populate("learnerId", "FirstName LastName Email")
      .populate("courseId", "Name Description");

    res.status(200).json({
      success: true,
      count: certificates.length,
      data: certificates,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Create a new certificate
// @route   POST /api/certificates
// @access  Private (Admin/Instructor only)
exports.createCertificate = async (req, res) => {
  try {
    const { url, issuedate, learnerId, courseId } = req.body;

    // Validation
    if (!url || !issuedate || !learnerId || !courseId) {
      return res.status(400).json({
        success: false,
        message: "URL, issue date, learner ID, and course ID are required",
      });
    }

    const certificate = await Certificate.create({
      url,
      issuedate,
      learnerId,
      courseId,
    });

    res.status(201).json({
      success: true,
      message: "Certificate created successfully",
      data: certificate,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update a certificate
// @route   PUT /api/certificates/:id
// @access  Private (Admin/Instructor only)
exports.updateCertificate = async (req, res) => {
  try {
    const { url, issuedate, learnerId, courseId } = req.body;

    const certificate = await Certificate.findByIdAndUpdate(
      req.params.id,
      {
        url,
        issuedate,
        learnerId,
        courseId,
      },
      { new: true, runValidators: true }
    )
      .populate("learnerId", "FirstName LastName Email")
      .populate("courseId", "Name Description");

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: "Certificate not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Certificate updated successfully",
      data: certificate,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete a certificate
// @route   DELETE /api/certificates/:id
// @access  Private (Admin/Instructor only)
exports.deleteCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findByIdAndDelete(req.params.id);

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: "Certificate not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Certificate deleted successfully",
      data: certificate,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
