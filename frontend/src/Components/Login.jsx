import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/Login.css';
import axios from 'axios';
import { jwtDecode } from "jwt-decode"; 

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
        'http://localhost:8080/auth/login',
        formData
      );

      if (response.status === 200 && response.data.token) {
        alert('Login successful!');

        const token = response.data.token;
        localStorage.setItem('token', token);

     
      const decoded = jwtDecode(token); 
        const role = decoded.role;

        const user = {
          id: response.data.userId,
          name: response.data.name,
          email: response.data.email,
          role: role 
        };

        localStorage.setItem('currentUser', JSON.stringify(user));

        navigate('/');
      } else {
        alert('Login failed. Please check your credentials.');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Invalid email or password. Try again.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Welcome Back</h2>
        <p className="subtitle">Login to AdaptMart</p>
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
        <button className="login-btn" onClick={handleSubmit}>
          Login
        </button>
        <p className="register-link">
          Don't have an account? <Link to="/register">Register Now</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
