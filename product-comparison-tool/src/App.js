import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import ProductList from './components/ProductList';
import ComparisonPage from './components/ComparisonPage';

function Home() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    const user = localStorage.getItem("user");
    if (user) navigate("/products");
    else navigate("/login");
  };

  return (
    <main className="home-container">
      <div className="home-content">
        <h1>Compare Products, Choose Better</h1>
        <p>
          Discover the smarter way to shop. Instantly compare features, pricing, and more with <strong>ProductCompare</strong>.
        </p>
        <button onClick={handleGetStarted} className="btn get-started-btn">
          Get Started →
        </button>
      </div>
      <div className="home-banner">
        <img
          src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop"
          alt="Product comparison"
        />
      </div>
    </main>
  );
}

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/compare" element={<ComparisonPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
