const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema({
    learnerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Learner",
        required: true
    },
    courseID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    },
    enrollmentDate: {
        type: Date,
        default: Date.now
    },
    progress: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ["enrolled", "completed", "in-progress"],
        default: "enrolled"
    },
    completionDate: {
        type: Date,
        default: null
    }
});

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);
module.exports = Enrollment;