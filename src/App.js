import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ProductCatalog from './components/ProductCatalog';
import ProductDetail from './components/ProductDetail';
import About from './About';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/divartsity/products.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  return (
    <Router>
      <div className="app">
        <nav>
          <ul>
            <li>
              <Link to="/divartsity/">Home</Link>
            </li>
            <li>
              <Link to="/divartsity/about">About</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/divartsity/" element={<ProductCatalog products={products} loading={loading} error={error} />} />
          <Route path="/divartsity/product/:id" element={<ProductDetail products={products} />} />
          <Route path="/divartsity/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
