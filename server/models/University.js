const mongoose = require('mongoose');

const UniversitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    state: String,
    city: String
  },
  requirements: {
    minGPA: Number,
    minSAT: Number,
    minIELTS: Number
  },
  tuition: {
    international: Number,
    domestic: Number
  },
  acceptanceRate: Number,
  financialAid: Boolean,
  applicationDeadlines: {
    early: Date,
    regular: Date
  },
  programs: [String]
});

module.exports = mongoose.model('University', UniversitySchema);