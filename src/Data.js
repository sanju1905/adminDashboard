import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Data() {
  const [users, setUsers] = useState([]);

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

  const handleUpdateUserStatus = async (userId, newStatus) => {
    try {
      await axios.patch(`http://localhost:8000/api/update_user_status/${userId}/`, {
        is_enabled: newStatus,
      });

      // Update the local state to reflect the change without another API call
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, is_enabled: newStatus } : user
        )
      );
    } catch (error) {
      console.error('Error updating user status:', error.response.data);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Admin Dashboard</h1>
      <div className="card">
        <div className="card-body">
          <h2 className="card-title mb-4">All Users</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Roll Number</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.roll_number}</td>
                  <td>
                    {user.is_enabled ? (
                      <button
                        className="btn btn-danger mr-2"
                        onClick={() => handleUpdateUserStatus(user.id, false)}
                      >
                        Disable
                      </button>
                    ) : (
                      <button
                        className="btn btn-success mr-2"
                        disabled={user.is_enabled}
                        onClick={() => handleUpdateUserStatus(user.id, true)}
                      >
                        Enable
                      </button>
                    )}
                    {user.is_enabled ? (
                      <span className="text-danger">Deny Access</span>
                    ) : (
                      <span className="text-success">Grant Access</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Data;
