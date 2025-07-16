import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/Register.css';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    userName: '',     
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8080/auth/register',
        formData
      );

      alert('Registration successful!');
      navigate('/login');
    } catch (error) {
      if (error.response) {
        alert('Registration failed: ' + (error.response.data.message || 'Please try again.'));
      } else {
        alert('Server error. Please try again later.');
      }
    }
  };

  return (
    <>
      <div className="sunset-register-page">
        <div className="sunset-card">
          <h2>AdaptMart Welcomes</h2>
          <p className="tagline">Your one-stop shop for everything you love</p>
          <input
            type="text"
            name="userName" 
            placeholder="username"
            value={formData.userName}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <button className="sunset-btn" onClick={handleSubmit}>
            Register
          </button>
          <p className="sunset-login-link">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;
