const mongoose = require("mongoose");

const instructorSchema = new mongoose.Schema({
    UserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    SkillID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skill",
        required: true
    },
    ExperienceYears: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    },
    Specialization: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Instructor = mongoose.model("Instructor", instructorSchema);
module.exports = Instructor;