import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Header from './Header';
import products from '../productsData';
import './ComparisonPage.css';

function ComparisonPage() {
  
  const location = useLocation();
  const selectedIds = location.state?.productIds || [1, 2, 3];

  // Filter out only the selected products from the full product list
  const selectedProducts = products.filter(product =>
    selectedIds.includes(product.id)
  );


  const getAllSpecKeys = () => {
    const allKeys = new Set();
    selectedProducts.forEach(product => {
      Object.keys(product.specs).forEach(key => allKeys.add(key));
    });
    return Array.from(allKeys); // Convert Set to Array
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
          // If no products selected, show message and link to product list
          <div className="no-products">
            <p>No products selected for comparison.</p>
            <Link to="/products" className="btn">Select Products</Link>
          </div>
        ) : (
          // If products are selected, render comparison table
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
                {/* Product Images */}
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

                {/* Product Prices */}
                <tr>
                  <td>Price</td>
                  {selectedProducts.map(product => (
                    <td key={product.id} className="price">
                      ${product.price.toFixed(2)}
                    </td>
                  ))}
                </tr>

                {/* Product Ratings */}
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

                {/* Dynamic Specification Rows */}
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
