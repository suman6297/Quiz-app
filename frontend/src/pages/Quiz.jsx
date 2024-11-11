import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState(Array(8).fill(null));
  const [score, setScore] = useState(null);
  const [result, setResult] = useState('');

  useEffect(() => {
    // Fetch questions from backend
    axios.get('http://localhost:5000/api/questions')
      .then((response) => setQuestions(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleOptionChange = (e, questionIndex) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = parseInt(e.target.value);
    setAnswers(updatedAnswers);
  };

  const handleSubmit = async () => {
    // Send answers to backend for scoring
    try {
      const response = await axios.post('http://localhost:5000/api/quiz-result', { answers });
      setScore(response.data.score);
      setResult(response.data.result);
      if (response.data.score < 15) {
        alert("you fail")
        
      } else {
        alert("you pass")
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  return (
    <div className='text-center'>
      <h1 className='text-5xl text-blue-900 mt-8'>Quiz </h1>
      {questions.length > 0 ? (
        <div>
          <form onSubmit={(e) => e.preventDefault()}>
            {questions.map((question, index) => (
              <div key={index} className='mt-10'>
                <h3 className='text-3xl mb-5 text-white'> <span className='mr-3'>{index+1}.</span>{question.question}</h3>
                {question.options.map((option, optionIndex) => (
                  <label key={optionIndex} className='mr-8 text-2xl 
                  '>
                    <input
                      type="radio"
                      value={optionIndex}
                      checked={answers[index] === optionIndex}
                      onChange={(e) => handleOptionChange(e, index)}
                      className='mr-2 pr-12'
                    />
                    {option}
                  </label>
                ))}
              </div>
            ))}
            <button type="button" className='block m-auto bg-orange-500 py-2 px-6 text-2xl rounded-2xl hover:bg-yellow-400 mt-8'  onClick={handleSubmit}>Submit</button>
          </form>
        </div>
      ) : (
        <p className='text-2xl '>Loading questions...</p>
      )}
      {score !== null && (
        <div>
          <h2 className='text-3xl text-white'>Your Score: {score}/20</h2>
          <h3 className='text-2xl text-white'  >{result}</h3>
        </div>
      )}
    </div>
  );
};

export default Quiz;
