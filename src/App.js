import React, { useState } from 'react';
import Quiz from './components/Quiz';
import Result from './components/Result';
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
  const [user, setUser] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [results, setResults] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);

  const startQuiz = () => {
    setQuizStarted(true);
  };

  const endQuiz = (score, detailedResults, timeTaken) => {
    setResults({ score, detailedResults, timeTaken });
    setQuizStarted(false);
  };

  const restartQuiz = () => {
    setQuizStarted(false);
    setResults(null);
  };

  return (
    <div>
      {!user ? (
        isRegistering ? (
          <Register setIsRegistering={setIsRegistering} />
        ) : (
          <Login setUser={setUser} setIsRegistering={setIsRegistering} />
        )
      ) : (
        <>
          {!quizStarted && !results && (
            <div className="homepage">
              <div className="welcome-message">
                <h1>Welcome to the AI, ML, and Computer Science Quiz!</h1>
                <p>Welcome, {user.username}!</p>
                <button onClick={startQuiz}>Start Quiz</button>
              </div>
            </div>
          )}
          {quizStarted && <Quiz username={user.username} endQuiz={endQuiz} />}
          {results && <Result results={results} restartQuiz={restartQuiz} />}
        </>
      )}
    </div>
  );
};

export default App;
