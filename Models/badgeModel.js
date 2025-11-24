const mongoose = require('mongoose');

const BadgeSchema = new mongoose.Schema({
  CourseID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  Name: {
    type: String,
    required: true,
    trim: true
  },
  Requirements: {
    type: String,
    required: true
  },
  Description: {
    type: String,
    default: ''
  },
  Icon: {
    type: String, 
    default: ''       // URL or file path
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Badge', BadgeSchema);
