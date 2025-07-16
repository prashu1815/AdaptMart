import React, { useEffect, useState } from 'react';
import '../Styles/User.css';

function User() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      alert('User not logged in');
      window.location.href = '/login';
    }
  }, []);

  return (
    <div className="user-profile-container">
      <h2>User Profile</h2>
      {user ? (
        <div className="user-card">
          <div className="user-avatar">
            <span>{user.userName.charAt(0).toUpperCase()}</span>
          </div>
          <div className="user-info">
            <p><strong>Name:</strong> {user.userName}</p>
            <p><strong>Email:</strong> {user.email}</p>
           
          </div>
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
}

export default User;
