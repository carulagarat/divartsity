import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/Navbar'; // Import the new NavBar component
import ProductCatalog from './components/ProductCatalog';
import ProductDetail from './components/ProductDetail';
import Footer from './components/Footer';
import About from './About';
import Cart from './Cart';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);
  const [lang, setLang] = useState('en');
  const [texts, setTexts] = useState({});
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Load language data
    fetch('/divartsity/lang.json')
      .then(response => response.json())
      .then(data => setTexts(data[lang]))
      .catch(error => console.error('Error fetching lang.json:', error));
  }, [lang]);

  useEffect(() => {
    // Load product data
    fetch('/divartsity/products.json')
      .then(response => response.json())
      .then(data => {
        if (data) {
          const translatedProducts = data.map(product => ({
            ...product,
            name: product.name[lang],
            description: product.description[lang]
          }));
          setProducts(translatedProducts);
        } else {
          console.error('Products data is undefined');
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products.json:', error);
        setError(error);
        setLoading(false);
      });
  }, [lang]);

  // Scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const addToCart = (item) => {
    setCart(prevCart => [...prevCart, item]);
  };

  const getTotalCartUnits = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const toggleLanguage = () => {
    setLang((prevLang) => (prevLang === 'en' ? 'es' : 'en'));
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/divartsity/" 
          element={<div className='trick' />} 
        />
      </Routes>
      <div className={`app ${isScrolled ? 'noPad' : ''}`}>
        <NavBar 
          isScrolled={isScrolled}
          texts={texts}
          getTotalCartUnits={getTotalCartUnits}
          toggleLanguage={toggleLanguage}
        />
        <Routes>
          <Route 
            path="/divartsity/" 
            element={<ProductCatalog products={products} loading={loading} error={error} texts={texts} />} 
          />
          <Route 
            path="/divartsity/product/:id" 
            element={<ProductDetail products={products} addToCart={addToCart} texts={texts} />} 
          />
          <Route path="/divartsity/about" element={<About texts={texts} />} />
          <Route path="/divartsity/cart" element={<Cart cart={cart} texts={texts} />} />
        </Routes>
        <Footer texts={texts} />
      </div>
    </Router>
  );
}

export default App;
