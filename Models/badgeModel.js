const mongoose = require('mongoose');

const BadgeSchema = new mongoose.Schema({
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
    default: ''   
  }
}, {
  timestamps: true
});

const Badge = mongoose.model('Badge', BadgeSchema);
module.exports = Badge;