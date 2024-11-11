const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const questionRoutes = require('./routes/Question');
const Question = require('./models/Question');

const authRoutes = require('./routes/auth');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use(bodyParser.json());
app.use('/api', questionRoutes);


// MongoDB connection
mongoose.connect(process.env.MONGO_URI )
  .then(() => {

//Add question

    // const questions = [
    //   {
    //     question: 'What is the capital of France?',
    //     options: ['Paris', 'London', 'Berlin', 'Rome'],
    //     correctAnswer: 0
    //   },
    //   {
    //     question: 'What is 2 + 2?',
    //     options: ['3', '4', '5', '6'],
    //     correctAnswer: 1
    //   },
    //   {
    //     question: 'What is 6 + 2 ?',
    //     options: ['3', '4', '8', '6'],
    //     correctAnswer: 2
    //   },]

    //   Question.insertMany(questions)
    //   .then(() => {
    //     console.log('Questions added to the database');
    //     mongoose.connection.close();
    //   })
      // .catch((err) => console.error(err));


    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
