import React, { useState } from 'react';
import Quiz from './Quiz';
import Result from './Result';

const App = () => {
  const [username, setUsername] = useState('');
  const [quizStarted, setQuizStarted] = useState(false);
  const [results, setResults] = useState(null);

  const startQuiz = () => {
    if (username.trim() === '') {
      alert('Please enter your name to start the quiz.');
      return;
    }
    setQuizStarted(true);
  };

  const endQuiz = (score, detailedResults, timeTaken) => {
    setResults({ score, detailedResults, timeTaken });
    setQuizStarted(false);
  };

  const restartQuiz = () => {
    setUsername('');
    setQuizStarted(false);
    setResults(null);
  };

  return (
    <div>
      {!quizStarted && !results && (
        <div className="homepage">
          <div className="welcome-message">
            <h1>Welcome to the AI, ML, and Computer Science Quiz!</h1>
            <p>Please enter your name to begin the quiz:</p>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your Name"
            />
            <button onClick={startQuiz}>Start Quiz</button>
          </div>
        </div>
      )}
      {quizStarted && <Quiz username={username} endQuiz={endQuiz} />}
      {results && <Result results={results} restartQuiz={restartQuiz} />}
    </div>
  );
};

export default App;
