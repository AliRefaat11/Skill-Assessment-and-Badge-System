const mongoose = require("mongoose");

const CourseInstructorSchema = new mongoose.Schema({
    courseID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    },
    instructorID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true
});

// Create a compound index to ensure unique course-instructor pairs
CourseInstructorSchema.index({ courseID: 1, instructorID: 1 }, { unique: true });

const CourseInstructor = mongoose.model("CourseInstructor", CourseInstructorSchema);
module.exports = CourseInstructor;

