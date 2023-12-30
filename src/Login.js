import React, { useState, useEffect } from 'react';
import axios from 'axios';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [loginError, setLoginError] = useState('');
  const [Users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get('http://localhost:8000/api/get_all_users/');
        setUsers(response.data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }

    fetchUsers();
  }, []);

  const handleLogin = () => {
    // Check if the Users array is defined
    if (Users) {
      // Find the user with the entered name
      const foundUser = Users.find((user) => user.name === username);

      if (foundUser && foundUser.is_enabled) {
        alert('Hello');
        setLoginError('');
      } else {
        setLoginError('No Access');
      }
    } else {
      // Handle the case when the Users array is undefined
      setLoginError('User data not available. Please try again.');
    }
  };

  return (
    <div>
      <h2>Login Form</h2>
      <div>
        <label htmlFor="username">Name:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Login</button>
      {loginError && <div style={{ color: 'red' }}>{loginError}</div>}
    </div>
  );
}

export default LoginForm;
