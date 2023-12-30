// Login.js

import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin, users }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/login/', {
        username,  // Assuming username is the name field
        password,  // Assuming password is the roll_number field
      });

      const loggedInUser = response.data.user;

      // Check if the user is enabled
      if (loggedInUser.is_enabled) {
        // Check if the logged-in user matches any user in the database
        const matchingUser = users.find(
          (user) => user.name === loggedInUser.name && user.roll_number === loggedInUser.roll_number
        );

        if (matchingUser) {
          // Successful login
          setLoginError('');
          onLogin();
        } else {
          setLoginError('User not found.');
        }
      } else {
        setLoginError('User is not enabled.');
      }
    } catch (error) {
      console.error('Login failed:', error.response.data);
      setLoginError('Login failed. Please check your credentials.');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div className="form-group">
        <label htmlFor="username">Name:</label>
        <input
          type="text"
          className="form-control"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Roll Number:</label>
        <input
          type="password"
          className="form-control"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Login
      </button>
      {loginError && <p className="text-danger mt-2">{loginError}</p>}
    </form>
  );
};

export default Login;
