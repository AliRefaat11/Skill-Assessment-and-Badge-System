const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    assessmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Assessment", required: true },

    type:     { type: String, enum: ["mcq", "true-false", "short"], default: "mcq" },
    text:     { type: String, required: true },
    points:   { type: Number, default: 1, min: 1 },

    options:  [{ type: String }],     // for mcq
    correctAnswer: { type: String, required: true }
  },
  { timestamps: true }
);

const Question = mongoose.model("Question", questionSchema);
module.exports = Question;