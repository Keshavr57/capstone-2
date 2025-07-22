import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './AuthForm.css';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5050/register', {
        email,
        password,
      });
      alert(res.data.message);
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || '❌ Registration failed');
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleRegister}>
        <h2>Register</h2>
        <input
          type="email"
          placeholder="✉️ Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="🔐 Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">📝 Register</button>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
        <Link to="/">🏠 Back to Home</Link>
      </form>
    </div>
  );
}

export default Register;
