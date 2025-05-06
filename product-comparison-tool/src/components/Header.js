import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">ProductCompare</Link>
      </div>
      <nav className="nav">
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/compare">Compare</Link></li>
        </ul>
      </nav>
      <div className="header-actions">
        <Link to="/login" className="login-btn">Login</Link>
      </div>
    </header>
  );
}

export default Header;