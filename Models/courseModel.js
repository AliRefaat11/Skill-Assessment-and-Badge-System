const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
    skillID: {
      type: mongoose.Schema.Types.ObjectId,
        ref: "Skill",
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        set: value => toTitleCase(value)
    },
    difficultyLevel: {
        type: String,
        enum: ["Beginner", "Intermediate", "Advanced"],
        required: true
    },
    duration: {
        type: Number, 
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Course", CourseSchema);