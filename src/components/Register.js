import React, { useState, useEffect } from 'react';

const Register = ({ setIsRegistering }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');
  const [usernameTaken, setUsernameTaken] = useState(false);
  const [usernameMessage, setUsernameMessage] = useState('');
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    specialChar: false,
    number: false,
  });

  useEffect(() => {
    if (username) {
      checkUsernameAvailability(username);
    }
    if (password) {
      validatePassword(password);
    }
  }, [username, password]);

  const checkUsernameAvailability = (username) => {
    const user = localStorage.getItem(username);
    if (user) {
      setUsernameTaken(true);
      setUsernameMessage('Username is already taken');
    } else {
      setUsernameTaken(false);
      setUsernameMessage('Username is available');
    }
  };

  const validatePassword = (password) => {
    const length = password.length >= 8;
    const uppercase = /[A-Z]/.test(password);
    const lowercase = /[a-z]/.test(password);
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const number = /[0-9]/.test(password);

    setPasswordStrength({
      length,
      uppercase,
      lowercase,
      specialChar,
      number,
    });
  };

  const handleRegister = () => {
    if (!username || !password || !dob) {
      alert('All fields are required.');
      return;
    }
    if (usernameTaken) {
      alert('Please choose a different username.');
      return;
    }
    if (!passwordStrength.length || !passwordStrength.uppercase || !passwordStrength.lowercase || !passwordStrength.specialChar || !passwordStrength.number) {
      alert('Please provide a valid password.');
      return;
    }
    const newUser = { username, password, dob };
    localStorage.setItem(username, JSON.stringify(newUser));
    alert('Registration successful! Please log in.');
    setIsRegistering(false);
  };

  return (
    <div className="register-page">
      <h2>Register</h2>
      <div className="input-container">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <p className={`username-message ${usernameTaken ? 'taken' : 'available'}`}>
          {usernameMessage}
        </p>
      </div>
      <div className="input-container">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <div className="password-strength">
          <p className={`password-check ${passwordStrength.length ? 'valid' : 'invalid'}`}>
            {passwordStrength.length ? '✓' : '✗'} At least 8 characters
          </p>
          <p className={`password-check ${passwordStrength.uppercase ? 'valid' : 'invalid'}`}>
            {passwordStrength.uppercase ? '✓' : '✗'} Contains uppercase letter
          </p>
          <p className={`password-check ${passwordStrength.lowercase ? 'valid' : 'invalid'}`}>
            {passwordStrength.lowercase ? '✓' : '✗'} Contains lowercase letter
          </p>
          <p className={`password-check ${passwordStrength.specialChar ? 'valid' : 'invalid'}`}>
            {passwordStrength.specialChar ? '✓' : '✗'} Contains special character
          </p>
          <p className={`password-check ${passwordStrength.number ? 'valid' : 'invalid'}`}>
            {passwordStrength.number ? '✓' : '✗'} Contains number
          </p>
        </div>
      </div>
      <div className="input-container">
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          placeholder="Date of Birth"
        />
      </div>
      <button onClick={handleRegister}>Register</button>
      <p>
        Already have an account? <span onClick={() => setIsRegistering(false)}>Login here</span>
      </p>
    </div>
  );
};

export default Register;
