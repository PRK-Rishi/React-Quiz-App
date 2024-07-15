import React from 'react';

const Result = ({ results, restartQuiz }) => {
  const { score, detailedResults, timeTaken } = results;
  const totalQuestions = detailedResults.length;

  return (
    <div className="result-page">
      <h1>Quiz Results</h1>
      <p>Your Score: {score} / {totalQuestions}</p>
      <p>Time Taken: {timeTaken}</p>
      <h2>Details</h2>
      <ul>
        {detailedResults.map((answer, index) => (
          <li key={index}>Question {index + 1}: {answer ? answer.toString() : "No Answer"}</li>
        ))}
      </ul>
      <button onClick={restartQuiz}>Restart Quiz</button>
    </div>
  );
};

export default Result;
