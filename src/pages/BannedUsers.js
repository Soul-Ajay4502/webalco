import React, { useState, useEffect } from 'react';
import './css/BannedUsers.css';
import axios from 'axios';

const BannedUsersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [bannedUsers, setBannedUsers] = useState([]);

  useEffect(() => {
    // Function to fetch ban requests from the API
    const fetchBannedUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/Admin/BannedUsers');
        setBannedUsers(response.data);
      } catch (error) {
        console.error('Error fetching banned users:', error);
      }
    };

    fetchBannedUsers();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = bannedUsers.filter((user) =>
    user.banned_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Banned Users</h2>
      <input
        type="text"
        placeholder="Search by username"
        value={searchTerm}
        onChange={handleSearch}
      />
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Reason for Ban</th>
            <th>Ban Period</th>
            <th>Reporter</th>
            <th>Proof</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.Report_ID}>
              <td>{user.banned_name}</td>
              <td>{user.reason}</td>
              <td>{user.Start_Date} TO {user.End_Date}</td>
              <td>{user.repoter_name}</td>
              <td>{user.Proof}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BannedUsersPage;
