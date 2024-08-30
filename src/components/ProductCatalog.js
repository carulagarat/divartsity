import React, { useState, useEffect } from 'react';

const ProductCatalog = () => {
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading products: {error.message}</p>;

  // Function to find the smallest price in the variants array
  const getSmallestPrice = (variants) => {
    if (variants.length === 0) return null;
    const prices = variants.map(variant => parseFloat(variant.price.replace('$', '')));
    const smallestPrice = Math.min(...prices);
    return `$${smallestPrice.toFixed(2)}`;
  };

  return (
    <div>
      <h1>Product Catalog</h1>
      <div className="product-list">
        {products.length > 0 ? (
          products.map(product => (
            <div key={product.id} className="product-card">
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>Starting at: {getSmallestPrice(product.variants)}</p>
              <div className="product-images">
                {product.images.map((image, index) => (
                  <img key={index} src={image} alt={`${product.name} image ${index + 1}`} />
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
};

export default ProductCatalog;
