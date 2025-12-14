const CourseInstructor = require("../models/courseInstructor");

/**
 * Get all course-instructor relationships
 * Optional query parameters: courseID, instructorID
 */
const getAllCourseInstructors = async (req, res) => {
  try {
    const { courseID, instructorID } = req.query;
    const filter = {};

    if (courseID) {
      filter.courseID = courseID;
    }

    if (instructorID) {
      filter.instructorID = instructorID;
    }

    const courseInstructors = await CourseInstructor.find(filter)
      .populate("courseID", "name")
      .populate("instructorID", "name email")
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: courseInstructors.length,
      data: courseInstructors
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching course instructors",
      error: error.message
    });
  }
};

/**
 * Get a single course-instructor relationship by ID
 */
const getCourseInstructorById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const courseInstructor = await CourseInstructor.findById(id)
      .populate("courseID", "name")
      .populate("instructorID", "name email");
    
    if (!courseInstructor) {
      return res.status(404).json({
        success: false,
        message: "Course instructor relationship not found"
      });
    }

    res.status(200).json({
      success: true,
      data: courseInstructor
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid course instructor ID format"
      });
    }
    
    res.status(500).json({
      success: false,
      message: "Error fetching course instructor",
      error: error.message
    });
  }
};

/**
 * Create a new course-instructor relationship
 */
const createCourseInstructor = async (req, res) => {
  try {
    const { courseID, instructorID } = req.body;

    // Validation
    if (!courseID || !instructorID) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields: courseID, instructorID"
      });
    }

    // Check if relationship already exists
    const existing = await CourseInstructor.findOne({ courseID, instructorID });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "This instructor is already assigned to this course"
      });
    }

    const courseInstructor = new CourseInstructor({
      courseID,
      instructorID
    });

    const savedCourseInstructor = await courseInstructor.save();
    const populatedCourseInstructor = await CourseInstructor.findById(savedCourseInstructor._id)
      .populate("courseID", "name")
      .populate("instructorID", "name email");

    res.status(201).json({
      success: true,
      message: "Course instructor relationship created successfully",
      data: populatedCourseInstructor
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
        message: "Invalid courseID or instructorID format"
      });
    }

    res.status(500).json({
      success: false,
      message: "Error creating course instructor relationship",
      error: error.message
    });
  }
};

/**
 * Update an existing course-instructor relationship
 */
const updateCourseInstructor = async (req, res) => {
  try {
    const { id } = req.params;
    const { courseID, instructorID } = req.body;

    const updateData = {};
    if (courseID) updateData.courseID = courseID;
    if (instructorID) updateData.instructorID = instructorID;

    // Check for duplicate if updating
    if (courseID || instructorID) {
      const current = await CourseInstructor.findById(id);
      if (!current) {
        return res.status(404).json({
          success: false,
          message: "Course instructor relationship not found"
        });
      }

      const checkCourseID = courseID || current.courseID;
      const checkInstructorID = instructorID || current.instructorID;
      
      const existing = await CourseInstructor.findOne({
        courseID: checkCourseID,
        instructorID: checkInstructorID,
        _id: { $ne: id }
      });

      if (existing) {
        return res.status(400).json({
          success: false,
          message: "This instructor is already assigned to this course"
        });
      }
    }

    const courseInstructor = await CourseInstructor.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    )
      .populate("courseID", "name")
      .populate("instructorID", "name email");

    if (!courseInstructor) {
      return res.status(404).json({
        success: false,
        message: "Course instructor relationship not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Course instructor relationship updated successfully",
      data: courseInstructor
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid course instructor ID, courseID, or instructorID format"
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
      message: "Error updating course instructor relationship",
      error: error.message
    });
  }
};

/**
 * Delete a course-instructor relationship
 */
const deleteCourseInstructor = async (req, res) => {
  try {
    const { id } = req.params;

    const courseInstructor = await CourseInstructor.findByIdAndDelete(id);

    if (!courseInstructor) {
      return res.status(404).json({
        success: false,
        message: "Course instructor relationship not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Course instructor relationship deleted successfully",
      data: courseInstructor
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid course instructor ID format"
      });
    }

    res.status(500).json({
      success: false,
      message: "Error deleting course instructor relationship",
      error: error.message
    });
  }
};

/**
 * Get all instructors for a specific course
 */
const getInstructorsByCourse = async (req, res) => {
  try {
    const { courseID } = req.params;

    const courseInstructors = await CourseInstructor.find({ courseID })
      .populate("courseID", "name")
      .populate("instructorID", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: courseInstructors.length,
      data: courseInstructors
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid courseID format"
      });
    }

    res.status(500).json({
      success: false,
      message: "Error fetching instructors for course",
      error: error.message
    });
  }
};

/**
 * Get all courses for a specific instructor
 */
const getCoursesByInstructor = async (req, res) => {
  try {
    const { instructorID } = req.params;

    const courseInstructors = await CourseInstructor.find({ instructorID })
      .populate("courseID", "name")
      .populate("instructorID", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: courseInstructors.length,
      data: courseInstructors
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid instructorID format"
      });
    }

    res.status(500).json({
      success: false,
      message: "Error fetching courses for instructor",
      error: error.message
    });
  }
};

module.exports = {
  getAllCourseInstructors,
  getCourseInstructorById,
  createCourseInstructor,
  updateCourseInstructor,
  deleteCourseInstructor,
  getInstructorsByCourse,
  getCoursesByInstructor
};

