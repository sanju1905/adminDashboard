// Admin.js

import React, { useState } from 'react';
import axios from 'axios';

function Admin() {
  const [name, setName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);

  const handleCreateUser = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/create_user/', {
        name,
        roll_number: rollNumber,
        is_enabled: isEnabled,
      });
      alert("User Created Successfully");
    } catch (error) {
      alert("User Creation Unsuccessful");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Admin Dashboard</h1>
      <div className="card">
        <div className="card-body">
          <h2 className="card-title mb-4">Create User</h2>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="rollNumber">Roll Number:</label>
            <input
              type="text"
              className="form-control"
              id="rollNumber"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
            />
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="isEnabled"
              checked={isEnabled}
              onChange={(e) => setIsEnabled(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="isEnabled">
              Enable User
            </label>
          </div>
          <button className="btn btn-primary mt-3" onClick={handleCreateUser}>
            Create User
          </button>
        </div>
      </div>
    </div>
  );
}

export default Admin;
