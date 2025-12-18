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
        required: true
    },
    status: {
        type: String,
        enum: ["passed", "failed"],
        default: "pending"
    },
    submittedAt: {
        type: Date,
        default: Date.now
    }
});

const AssessmentAttempt = mongoose.model("AssessmentAttempt", assessmentAttemptSchema);
module.exports = AssessmentAttempt;