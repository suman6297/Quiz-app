const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: Number, required: true },  // Index of the correct option (0-3)
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
