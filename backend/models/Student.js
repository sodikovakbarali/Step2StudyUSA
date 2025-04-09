// models/Student.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  gpa: Number,
  ielts: Number,
  sat: Number,
  budget: Number,
  interests: [String],
  savedUniversities: [String], // Later we can make this ref to University model
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
