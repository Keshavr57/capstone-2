import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import './ComparisonPage.css';

function ComparisonPage() {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5050/products');
        const data = await response.json();
        setProducts(data);

        const selectedIds = JSON.parse(localStorage.getItem('compareIds')) || [];
        const filtered = data.filter(p => selectedIds.includes(p.id));
        setSelectedProducts(filtered);
      } catch (err) {
        console.error("❌ Failed to load products", err);
      }
    };

    fetchProducts();
  }, []);

  const getAllSpecKeys = () => {
    const allKeys = new Set();
    selectedProducts.forEach(product => {
      Object.keys(product.specs).forEach(key => allKeys.add(key));
    });
    return Array.from(allKeys);
  };

  const specKeys = getAllSpecKeys();

  return (
    <div className="app">
      <Header />
      <main className="comparison-container">
        <div className="comparison-header">
          <h1>Product Comparison</h1>
          <Link to="/products" className="btn back-to-products">
            Back to Products
          </Link>
        </div>

        {selectedProducts.length === 0 ? (
          <div className="no-products">
            <p>No products selected for comparison.</p>
            <Link to="/products" className="btn">Select Products</Link>
          </div>
        ) : (
          <div className="comparison-table-container">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  {selectedProducts.map(product => (
                    <th key={product.id}>{product.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Image</td>
                  {selectedProducts.map(product => (
                    <td key={product.id}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="comparison-image"
                      />
                    </td>
                  ))}
                </tr>

                <tr>
                  <td>Price</td>
                  {selectedProducts.map(product => (
                    <td key={product.id} className="price">
                      ${product.price.toFixed(2)}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td>Rating</td>
                  {selectedProducts.map(product => (
                    <td key={product.id}>
                      <div className="product-rating">
                        <span className="stars">
                          {'★'.repeat(Math.floor(product.rating))}
                          {product.rating % 1 >= 0.5 ? '½' : ''}
                          {'☆'.repeat(5 - Math.ceil(product.rating))}
                        </span>
                        <span className="rating-number">{product.rating}</span>
                      </div>
                    </td>
                  ))}
                </tr>

                {specKeys.map(key => (
                  <tr key={key}>
                    <td className="spec-name">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </td>
                    {selectedProducts.map(product => (
                      <td key={product.id}>
                        {product.specs[key] || '—'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}

export default ComparisonPage;
