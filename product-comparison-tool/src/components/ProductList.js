import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import products from '../productsData';
import './ProductList.css';

function ProductList() {
  const [selectedProducts, setSelectedProducts] = useState([]);

  // Toggle product selection for comparison
  const toggleProductSelection = (productId) => {
    if (selectedProducts.includes(productId)) {
      // If already selected, remove it
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
    } else {
      // If not selected, add it (limit to 3 products for comparison)
      if (selectedProducts.length < 3) {
        setSelectedProducts([...selectedProducts, productId]);
      } else {
        alert('You can only compare up to 3 products at a time');
      }
    }
  };

  return (
    <div className="app">
      <Header />
      <main className="product-list-container">
        <div className="product-list-header">
          <h1>Browse Products</h1>
          <p>Select products to compare or view details</p>
          
          {selectedProducts.length > 0 && (
            <div className="comparison-bar">
              <p>{selectedProducts.length} products selected</p>
              <Link 
                to="/compare" 
                state={{ productIds: selectedProducts }}
                className="btn compare-btn"
              >
                Compare Selected
              </Link>
            </div>
          )}
        </div>

        <div className="product-grid">
          {products.map(product => (
            <div 
              key={product.id} 
              className={`product-card ${selectedProducts.includes(product.id) ? 'selected' : ''}`}
            >
              <div className="product-image">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="product-price">${product.price.toFixed(2)}</p>
                <div className="product-rating">
                  <span className="stars">
                    {'★'.repeat(Math.floor(product.rating))}
                    {product.rating % 1 >= 0.5 ? '½' : ''}
                    {'☆'.repeat(5 - Math.ceil(product.rating))}
                  </span>
                  <span className="rating-number">{product.rating}</span>
                </div>
                <button 
                  onClick={() => toggleProductSelection(product.id)}
                  className={`compare-toggle ${selectedProducts.includes(product.id) ? 'selected' : ''}`}
                >
                  {selectedProducts.includes(product.id) ? 'Selected' : 'Compare'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default ProductList;