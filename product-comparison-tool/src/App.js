import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import Header from './components/Header';

function App() {
  return (
    <div className="app">
      <Header />
      <main className="home-container">
        <div className="home-content">
          <h1>Welcome to Product Comparison Tool</h1>
          <p>Compare products side by side to make smarter shopping decisions.</p>
          <p>Browse through our catalog and select items to compare their features, prices, and ratings.</p>
          <Link to="/products" className="btn get-started-btn">
            Get Started
          </Link>
        </div>
        <div className="home-banner">
          <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop" alt="Product comparison illustration" />
        </div>
      </main>
    </div>
  );
}

export default App;