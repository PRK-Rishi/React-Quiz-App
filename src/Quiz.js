import React, { useState, useEffect } from 'react';
import Questions from './Questions';

const Quiz = ({ username, endQuiz }) => {
  const questionsPerPage = 5;
  const totalTime = 300; // 5 minutes in seconds
  const [currentPage, setCurrentPage] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(totalTime);
  const [quizStartTime] = useState(new Date());
  const [userAnswers, setUserAnswers] = useState(Array(20).fill(null));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          autoSubmitQuiz();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const autoSubmitQuiz = () => {
    alert('Time is up! Submitting your quiz.');
    submitQuiz();
  };

  const handleAnswerChange = (index, answer) => {
    const newAnswers = [...userAnswers];
    newAnswers[index] = answer;
    setUserAnswers(newAnswers);
  };

  const submitQuiz = () => {
    const score = calculateScore();
    const timeTaken = calculateTimeTaken();
    endQuiz(score, userAnswers, timeTaken);
  };

  const calculateScore = () => {
    const correctAnswers = [
      "John McCarthy", "Python", ["Supervised Learning", "Unsupervised Learning", "Reinforcement Learning"],
      "Natural Language Processing", "To determine if a machine can exhibit intelligent behavior equivalent to a human",
      "K-Means", ["TensorFlow", "PyTorch", "Keras"], "Support Vector Machine", "MNIST", "RNN",
      ["ReLU", "Sigmoid", "Tanh"], "JavaScript", "Application Programming Interface", "Stack", ["MongoDB", "CouchDB"],
      "Cascading Style Sheets", "To structure web content", "HTTPS", ["Phishing", "SQL Injection", "DDoS"], "Graphical Processing Unit"
    ];

    let score = 0;
    userAnswers.forEach((answer, index) => {
      if (Array.isArray(correctAnswers[index])) {
        if (JSON.stringify(answer) === JSON.stringify(correctAnswers[index])) {
          score++;
        }
      } else if (answer === correctAnswers[index]) {
        score++;
      }
    });
    return score;
  };

  const calculateTimeTaken = () => {
    const endTime = new Date();
    const timeDiff = endTime - quizStartTime; // Time difference in milliseconds
    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    return `${minutes.toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
  };

  const changePage = (step) => {
    setCurrentPage((prevPage) => prevPage + step);
  };

  const showPage = (page) => {
    const totalPages = Math.ceil(userAnswers.length / questionsPerPage);
    return page >= 0 && page < totalPages;
  };

  return (
    <div className="container">
      <h1>AI, ML, and Computer Science Quiz</h1>
      <div id="timer">Time Remaining: {`${Math.floor(timeRemaining / 60).toString().padStart(2, '0')}:${(timeRemaining % 60).toString().padStart(2, '0')}`}</div>
      <Questions currentPage={currentPage} userAnswers={userAnswers} onAnswerChange={handleAnswerChange} />
      <div id="pagination">
        {showPage(currentPage - 1) && <button type="button" id="prevBtn" onClick={() => changePage(-1)}>Previous</button>}
        {showPage(currentPage + 1) && <button type="button" id="nextBtn" onClick={() => changePage(1)}>Next</button>}
      </div>
      {currentPage === Math.ceil(userAnswers.length / questionsPerPage) - 1 && (
        <button id="submitBtn" onClick={submitQuiz}>Submit</button>
      )}
    </div>
  );
};

export default Quiz;
