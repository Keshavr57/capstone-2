import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './AuthForm.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5050/login', { email, password });
      alert(res.data.message);
      localStorage.setItem('user', JSON.stringify({ email }));
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || '❌ Login failed');
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleLogin}>
        <h2>Login</h2>
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
        <button type="submit">🔓 Login</button>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
        <Link to="/">🏠 Back to Home</Link>
      </form>
    </div>
  );
}

export default Login;
