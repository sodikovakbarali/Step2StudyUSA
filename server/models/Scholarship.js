const mongoose = require('mongoose');

const ScholarshipSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  university: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'University',
    required: true
  },
  description: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  requirements: {
    gpa: Number,
    satScore: Number,
    ieltsScore: Number,
    essay: Boolean,
    recommendation: Boolean
  },
  deadline: {
    type: Date,
    required: true
  },
  applicationLink: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Scholarship', ScholarshipSchema);
