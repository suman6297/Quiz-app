const express = require('express');
const Question = require('../models/Question');
const router = express.Router();

// Route to get all questions
router.get('/questions', async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/questionsone', async (req, res) => {
    try {
      const questions = await Question.deleteOne();
      res.status(200).json({massege:' deleted sucessfully'}  );
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

// Route to get quiz result
router.post('/quiz-result', async (req, res) => {
  const answers = req.body.answers;
  
  try {
    const questions = await Question.find();
    let score = 0;

    answers.forEach((answer, index) => {
      if (answer === questions[index].correctAnswer) {
        score += 1;
      }
    });

    const result = score >= 15 ? 'Pass' : 'Fail';
    res.json({ score, result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
