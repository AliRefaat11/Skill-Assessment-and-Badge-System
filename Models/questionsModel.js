const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    assessmentId:{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Assessment", 
      required: true 
    },
    type:{ 
      type: String, 
      enum: ["mcq", "true-false", "short"], 
      default: "mcq" 
    },
    text:{ 
      type: String, 
      required: true 
    },
    points:{ 
      type: Number, 
      required: true, 
      min: 1 
    },
    correctAnswer: { 
      type: String, 
      required: true 
    },
    // For MCQ type questions
    options: {
    type: [String],
    default: []
  }
  },
  { timestamps: true }
);

const Question = mongoose.model("Question", questionSchema);
module.exports = Question;