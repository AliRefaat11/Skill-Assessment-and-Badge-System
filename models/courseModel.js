const mongoose = require("mongoose");

// Helper to normalize course names
const toTitleCase = (value = "") =>
  value
    .toString()
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());

const CourseSchema = new mongoose.Schema({
    skillID: {
      type: mongoose.Schema.Types.ObjectId,
        ref: "Skill",
        required: false
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
