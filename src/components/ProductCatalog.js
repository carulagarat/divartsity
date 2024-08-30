import React from 'react';
import { Link } from 'react-router-dom';

const ProductCatalog = ({ products, loading, error }) => {
  // Function to find the smallest price in the variants array
  const getSmallestPrice = (variants) => {
    if (variants.length === 0) return null;
    const prices = variants.map(variant => parseFloat(variant.price.replace('$', '')));
    const smallestPrice = Math.min(...prices);
    return `$${smallestPrice.toFixed(2)}`;
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading products: {error.message}</p>;

  return (
    <div>
      <h1>Product Catalog</h1>
      <div className="product-list">
        {products.length > 0 ? (
          products.map(product => (
            <div key={product.id} className="product-card">
              <Link to={`/divartsity/product/${product.id}`}>
                <div className="product-images">
                  {product.images.map((image, index) => (
                    <img key={index} src={image} alt={`${product.name} image ${index + 1}`} />
                  ))}
                </div>
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p>Starting at: {getSmallestPrice(product.variants)}</p>
              </Link>
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
