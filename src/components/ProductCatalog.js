import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Filters from './Filters';

const ProductCatalog = ({ products, loading, error, texts }) => {
  // State for filters
  const [selectedTag, setSelectedTag] = useState('');
  const [selectedFamily, setSelectedFamily] = useState('');
  const [selectedOrder, setSelectedOrder] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Function to find the smallest price in the variants array
  const getSmallestPrice = (variants) => {
    if (variants.length === 0) return null;
    const prices = variants.map(variant => parseFloat(variant.price.replace('$', '')));
    const smallestPrice = Math.min(...prices);
    return `$${smallestPrice.toFixed(2)}`;
  };

  // Filter products based on tags, family, order, and search query
  const filteredProducts = products.filter(product => {
    const matchesTag = !selectedTag || product.tags.includes(selectedTag);
    const matchesFamily = !selectedFamily || product.family === selectedFamily;
    const matchesOrder = !selectedOrder || product.order === selectedOrder;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTag && matchesFamily && matchesOrder && matchesSearch;
  });

  // Function to clear all filters
  const clearAllFilters = () => {
    setSelectedTag('');
    setSelectedFamily('');
    setSelectedOrder('');
    setSearchQuery('');
  };

  if (loading) return <p>{texts.loading}</p>;
  if (error) return <p>{texts.errorLoadingProducts}: {error.message}</p>;

  return (
    <div className='page'>
      <div className='content'>

        <h1>{texts.productCatalog}</h1>

        {/* Use the Filters component */}
        <Filters 
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
          selectedFamily={selectedFamily}
          setSelectedFamily={setSelectedFamily}
          selectedOrder={selectedOrder}
          setSelectedOrder={setSelectedOrder}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          products={products}  // Pass products here
          texts={texts}
          clearAllFilters={clearAllFilters}
        />

        <div className="product-list row wrap">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <div key={product.id} className="product-card">
                <Link to={`/divartsity/product/${product.id}`}>
                  <div className="product-images">
                    {product.images.map((image, index) => (
                      <img key={index} src={image} alt={`${product.name} image ${index + 1}`} />
                    ))}
                  </div>
                  
                  <div className='info'>
                    <div className='row'>
                      <h3>{product.name}</h3>
                      <p className='price'><span>{texts.from}:</span> {getSmallestPrice(product.variants)}<span>€</span></p>
                    </div>
                    <h4>{product.scienceName}</h4>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p>{texts.noProductsAvailable}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCatalog;
