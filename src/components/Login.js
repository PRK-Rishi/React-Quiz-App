import React, { useState } from 'react';
import Register from './Register';

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogin = () => {
    const storedUser = JSON.parse(localStorage.getItem(username));
    if (storedUser && storedUser.password === password) {
      setUser(storedUser);
    } else {
      alert('Invalid username or password.');
    }
  };

  return (
    <div className="login-page">
      {isRegistering ? (
        <Register setIsRegistering={setIsRegistering} />
      ) : (
        <>
          <h2>Login</h2>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button onClick={handleLogin}>Login</button>
          <p>
            New user? <span onClick={() => setIsRegistering(true)}>Register here</span>
          </p>
        </>
      )}
    </div>
  );
};

export default Login;
