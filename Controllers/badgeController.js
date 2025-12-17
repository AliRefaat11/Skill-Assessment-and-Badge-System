const Badge = require("../Models/badgeModel");

exports.getBadges = async (req, res) => {
  try {
    const badges = await Badge.find().populate("CourseID", "Name Description");
    res.status(200).json({
      success: true,
      count: badges.length,
      data: badges,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get a single badge by ID
// @route   GET /api/badges/:id
// @access  Public
exports.getBadgeById = async (req, res) => {
  try {
    const badge = await Badge.findById(req.params.id).populate(
      "CourseID",
      "Name Description"
    );
    if (!badge) {
      return res.status(404).json({
        success: false,
        message: "Badge not found",
      });
    }
    res.status(200).json({
      success: true,
      data: badge,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get badges by Course ID
// @route   GET /api/badges/course/:courseId
// @access  Public
exports.getBadgesByCourse = async (req, res) => {
  try {
    const badges = await Badge.find({ CourseID: req.params.courseId }).populate(
      "CourseID",
      "Name Description"
    );
    res.status(200).json({
      success: true,
      count: badges.length,
      data: badges,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Create a new badge
// @route   POST /api/badges
// @access  Private (Admin only)
exports.createBadge = async (req, res) => {
  try {
    const { CourseID, Name, Requirements, Description, Icon } = req.body;

    // Validation
    if (!CourseID || !Name || !Requirements) {
      return res.status(400).json({
        success: false,
        message: "CourseID, Name, and Requirements are required",
      });
    }

    const badge = await Badge.create({
      CourseID,
      Name,
      Requirements,
      Description,
      Icon,
    });

    res.status(201).json({
      success: true,
      message: "Badge created successfully",
      data: badge,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update a badge
// @route   PUT /api/badges/:id
// @access  Private (Admin only)
exports.updateBadge = async (req, res) => {
  try {
    const { CourseID, Name, Requirements, Description, Icon } = req.body;

    const badge = await Badge.findByIdAndUpdate(
      req.params.id,
      {
        CourseID,
        Name,
        Requirements,
        Description,
        Icon,
      },
      { new: true, runValidators: true }
    ).populate("CourseID", "Name Description");

    if (!badge) {
      return res.status(404).json({
        success: false,
        message: "Badge not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Badge updated successfully",
      data: badge
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.deleteBadge = async (req, res) => {
  try {
    const badge = await Badge.findByIdAndDelete(req.params.id);
    if (!badge) {
      return res.status(404).json({ success: false, message: "Badge not found" });
    }

    res.status(200).json({
      success: true,
      message: "Badge deleted successfully",
      data: badge,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
