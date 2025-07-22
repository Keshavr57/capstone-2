import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import ProductList from './components/ProductList';
import Login from './components/Login';
import Register from './components/Register'; // ✅ Add this line
import ComparisonPage from './components/ComparisonPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> {/* ✅ Add this */}
        <Route path="/compare" element={<ComparisonPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
