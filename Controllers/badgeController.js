const Badge = require('../Models/badgeModel');

// CREATE a badge
exports.createBadge = async (req, res) => {
  try {
    const badge = await Badge.create(req.body);
    res.status(201).json({
      success: true,
      message: "Badge created successfully",
      data: badge
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// GET all badges
exports.getBadges = async (req, res) => {
  try {
    const badges = await Badge.find().populate('CourseID');
    res.status(200).json({ success: true, data: badges });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET one badge by ID
exports.getBadgeById = async (req, res) => {
  try {
    const badge = await Badge.findById(req.params.id).populate('CourseID');
    if (!badge) {
      return res.status(404).json({ success: false, message: "Badge not found" });
    }
    res.status(200).json({ success: true, data: badge });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE badge
exports.updateBadge = async (req, res) => {
  try {
    const updatedBadge = await Badge.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // return updated object
    );

    if (!updatedBadge) {
      return res.status(404).json({ success: false, message: "Badge not found" });
    }

    res.status(200).json({
      success: true,
      message: "Badge updated successfully",
      data: updatedBadge
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// DELETE badge
exports.deleteBadge = async (req, res) => {
  try {
    const badge = await Badge.findByIdAndDelete(req.params.id);
    if (!badge) {
      return res.status(404).json({ success: false, message: "Badge not found" });
    }

    res.status(200).json({
      success: true,
      message: "Badge deleted successfully"
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
