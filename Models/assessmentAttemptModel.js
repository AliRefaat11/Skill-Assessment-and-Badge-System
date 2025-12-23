const mongoose = require("mongoose");

const assessmentAttemptSchema = new mongoose.Schema({
    learnerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Learner",
        required: true
    },
    assessmentID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Assessment",
        required: true
    },
    score: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ["pending", "in-progress", "submitted", "passed", "failed"],
        default: "pending"
    },
    answers: [{
        questionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Question",
            required: true
        },
        answer: {
            type: String,
            required: true
        }
    }],
    startedAt: {
        type: Date
    },
    submittedAt: {
        type: Date
    }
});

const AssessmentAttempt = mongoose.model("AssessmentAttempt", assessmentAttemptSchema);
module.exports = AssessmentAttempt;