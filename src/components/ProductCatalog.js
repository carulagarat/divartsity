import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Filters from './Filters';

const ProductCatalog = ({ products, loading, error, texts }) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedFamily, setSelectedFamily] = useState('');
  const [selectedOrder, setSelectedOrder] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const getSmallestPrice = (variants) => {
    const prices = variants.map(variant => {
      return typeof variant.price === 'string' 
        ? parseFloat(variant.price.replace('€', '')) 
        : variant.price;
    });
    
    return Math.min(...prices).toFixed(2);
  };
  
  const filteredProducts = products.filter(product => {
    // Check if product tags include all selected tags
    const matchesTag = selectedTags.length === 0 || selectedTags.every(tag => product.tags.includes(tag));
    
    // Other filter criteria
    const matchesFamily = !selectedFamily || product.family === selectedFamily;
    const matchesOrder = !selectedOrder || product.order === selectedOrder;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
  
    return matchesTag && matchesFamily && matchesOrder && matchesSearch;
  });
  
  
  const clearAllFilters = () => {
    setSelectedTags([]);
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

        <Filters
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          selectedFamily={selectedFamily}
          setSelectedFamily={setSelectedFamily}
          selectedOrder={selectedOrder}
          setSelectedOrder={setSelectedOrder}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          products={products}
          texts={texts}
          clearAllFilters={clearAllFilters}
        />
        <div className="product-list content row wrap">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <div key={product.id} className="product-card">
                <Link to={`/divartsity/product/${product.id}`}>
                  <div className="product-images">
                    <img src={`/divartsity/images/product-images/${product.id}/${product.id}-thumb1.jpg`} alt={`${product.name} thumbnail 1`} />
                    <img src={`/divartsity/images/product-images/${product.id}/${product.id}-thumb2.jpg`} alt={`${product.name} thumbnail 2`} />
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
