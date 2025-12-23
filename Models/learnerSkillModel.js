const mongoose = require("mongoose");

const learnerSkillSchema = new mongoose.Schema({
    learnerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Learner",
        required: true
    },
    skillID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skill",
        required: true
    }
}, {
    timestamps: true
});

const LearnerSkill = mongoose.model("LearnerSkill", learnerSkillSchema);
module.exports = LearnerSkill;