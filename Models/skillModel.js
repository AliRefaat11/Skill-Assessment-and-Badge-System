const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema(
  {
    skillName: {
      type: String,
      required: [true, "Skill name is required"]
    },
    category: {
      type: String,
      enum: ["Programming", "Design", "Marketing", "Business", "Data Science", "Other"],
      required: [true, "Category level is required"]
    },
    description: {
      type: String,
      trim: true
    },
    difficultyLevel: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: [true, "Difficulty level is required"]
    }
  },
  { timestamps: true
  }
);

const Skill = mongoose.model("Skill", skillSchema);
module.exports = Skill;