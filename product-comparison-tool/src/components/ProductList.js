import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import products from '../productsData';
import './ProductList.css';

function ProductList() {
  const [selectedProducts, setSelectedProducts] = useState([]);

  // Toggle product selection for comparison
  const toggleProductSelection = (productId) => {
    const isSelected = selectedProducts.includes(productId);

    if (isSelected) {
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
    } else {
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
              <p>{selectedProducts.length} product(s) selected</p>
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
          {products.map(product => {
            const isSelected = selectedProducts.includes(product.id);

            return (
              <div 
                key={product.id} 
                className={`product-card ${isSelected ? 'selected' : ''}`}
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
                    className={`compare-toggle ${isSelected ? 'selected' : ''}`}
                  >
                    {isSelected ? 'Selected' : 'Compare'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default ProductList;
