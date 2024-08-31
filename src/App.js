import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ProductCatalog from './components/ProductCatalog';
import ProductDetail from './components/ProductDetail';
import About from './About';
import Cart from './Cart';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);

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

  // Function to add items to the cart
  const addToCart = (item) => {
    setCart(prevCart => [...prevCart, item]);
  };

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
            <li>
              <Link to="/divartsity/cart">Cart</Link> {/* Link to the cart page */}
            </li>
          </ul>
        </nav>
        <Routes>
          <Route 
            path="/divartsity/" 
            element={<ProductCatalog products={products} loading={loading} error={error} />} 
          />
          <Route 
            path="/divartsity/product/:id" 
            element={<ProductDetail products={products} addToCart={addToCart} />} 
          />
          <Route path="/divartsity/about" element={<About />} />
          <Route path="/divartsity/cart" element={<Cart cart={cart} />} /> {/* Route for the cart page */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
