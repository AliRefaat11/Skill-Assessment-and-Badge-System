const mongoose = require("mongoose");

const learnerBadgeSchema = new mongoose.Schema({
    learnerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Learner",
        required: true
    },
    badgeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Badge",
        required: true
    },
    awardedAt: {
        type: Date,
        default: Date.now
    }
});

const LearnerBadge = mongoose.model("LearnerBadge", learnerBadgeSchema);
module.exports = LearnerBadge;