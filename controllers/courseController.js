const Course = require("../Models/courseModel");


const getAllCourses = async (req, res) => {
  try {
    const { skillID, difficultyLevel } = req.query;
    const filter = {};

    if (skillID) {
      filter.skillID = skillID;
    }

    if (difficultyLevel) {
      filter.difficultyLevel = difficultyLevel;
    }

    const courses = await Course.find(filter).populate("skillID", "name").sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching courses",
      error: error.message
    });
  }
};

/**
 * Get a single course by ID
 */
const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const course = await Course.findById(id).populate("skillID", "name");
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found"
      });
    }

    res.status(200).json({
      success: true,
      data: course
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid course ID format"
      });
    }
    
    res.status(500).json({
      success: false,
      message: "Error fetching course",
      error: error.message
    });
  }
};

/**
 * Create a new course
 */
const createCourse = async (req, res) => {
  try {
    const { skillID, name, difficultyLevel, duration, price } = req.body;

    // Validation
    if (!skillID || !name || !difficultyLevel || duration === undefined || price === undefined) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields: skillID, name, difficultyLevel, duration, price"
      });
    }

    // Validate difficultyLevel enum
    const validLevels = ["Beginner", "Intermediate", "Advanced"];
    if (!validLevels.includes(difficultyLevel)) {
      return res.status(400).json({
        success: false,
        message: `difficultyLevel must be one of: ${validLevels.join(", ")}`
      });
    }

    // Validate duration and price are positive numbers
    if (duration <= 0 || price < 0) {
      return res.status(400).json({
        success: false,
        message: "Duration must be greater than 0 and price must be non-negative"
      });
    }

    const course = new Course({
      skillID,
      name,
      difficultyLevel,
      duration,
      price
    });

    const savedCourse = await course.save();
    const populatedCourse = await Course.findById(savedCourse._id).populate("skillID", "name");

    res.status(201).json({
      success: true,
      message: "Course created successfully",
      data: populatedCourse
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        error: error.message
      });
    }
    
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid skillID format"
      });
    }

    res.status(500).json({
      success: false,
      message: "Error creating course",
      error: error.message
    });
  }
};

/**
 * Update an existing course
 */
const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { skillID, name, difficultyLevel, duration, price } = req.body;

    // Validate difficultyLevel if provided
    if (difficultyLevel) {
      const validLevels = ["Beginner", "Intermediate", "Advanced"];
      if (!validLevels.includes(difficultyLevel)) {
        return res.status(400).json({
          success: false,
          message: `difficultyLevel must be one of: ${validLevels.join(", ")}`
        });
      }
    }

    // Validate duration and price if provided
    if (duration !== undefined && duration <= 0) {
      return res.status(400).json({
        success: false,
        message: "Duration must be greater than 0"
      });
    }

    if (price !== undefined && price < 0) {
      return res.status(400).json({
        success: false,
        message: "Price must be non-negative"
      });
    }

    const updateData = {};
    if (skillID) updateData.skillID = skillID;
    if (name) updateData.name = name;
    if (difficultyLevel) updateData.difficultyLevel = difficultyLevel;
    if (duration !== undefined) updateData.duration = duration;
    if (price !== undefined) updateData.price = price;

    const course = await Course.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate("skillID", "name");

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: course
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid course ID or skillID format"
      });
    }
    
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        error: error.message
      });
    }

    res.status(500).json({
      success: false,
      message: "Error updating course",
      error: error.message
    });
  }
};

/**
 * Delete a course
 */
const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findByIdAndDelete(id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
      data: course
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid course ID format"
      });
    }

    res.status(500).json({
      success: false,
      message: "Error deleting course",
      error: error.message
    });
  }
};

/**
 * Get courses by skillID
 */
const getCoursesBySkill = async (req, res) => {
  try {
    const { skillID } = req.params;

    const courses = await Course.find({ skillID })
      .populate("skillID", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid skillID format"
      });
    }

    res.status(500).json({
      success: false,
      message: "Error fetching courses by skill",
      error: error.message
    });
  }
};

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  getCoursesBySkill
};

