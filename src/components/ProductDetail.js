import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = ({ products, addToCart }) => {
  const { id } = useParams();
  const product = products.find(p => p.id.toString() === id);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product && product.variants.length > 0) {
      setSelectedVariant(product.variants[0]);
    }
  }, [product]);

  if (!product) {
    return <p>Product not found!</p>;
  }

  // Function to handle variant selection
  const handleVariantSelect = (variant) => {
    setSelectedVariant(variant);
  };

  // Function to handle quantity change
  const handleQuantityChange = (e) => {
    setQuantity(Number(e.target.value));
  };

  // Calculate total price
  const calculateTotalPrice = () => {
    if (!selectedVariant) return "0.00";
    const price = parseFloat(selectedVariant.price.replace('$', ''));
    return (price * quantity).toFixed(2);
  };

  // Function to handle adding to cart
  const handleAddToCart = () => {
    if (selectedVariant && quantity > 0) {
      const item = {
        productId: product.id,
        name: product.name,
        variant: selectedVariant.size,
        price: selectedVariant.price,
        quantity: quantity,
        totalPrice: calculateTotalPrice()
      };
      addToCart(item);
      setQuantity(1); // Reset the quantity input to 1 after adding to cart
    }
  };

  return (
    <div className='page'>
      <div className="product-images">
        {product.images.map((image, index) => (
          <img key={index} src={image} alt={`${product.name} image ${index + 1}`} />
        ))}
      </div>
      <h1>{product.name}</h1>
      
      {product.scienceName ? <h2>({product.scienceName})</h2> : null}

      <p>Class: {product.class}</p>
      <p>Order: {product.order}</p>
      <p>Family: {product.family}</p>
      <p>{product.description}</p>
      {selectedVariant && (
          <p className='dimensions'>
            <span>{selectedVariant.dimensions.width}</span>
            <span>x</span>
            <span>{selectedVariant.dimensions.height}</span>
            <span>x</span>
            <span>{selectedVariant.dimensions.depth}</span>
            <span>cm</span>
          </p>
      )}
      <h3>Variants</h3>
      <ul>
        {product.variants.map((variant, index) => (
          <button
            className='tag'
            key={index}
            onClick={() => handleVariantSelect(variant)}
            style={{ 
              fontWeight: selectedVariant && selectedVariant.size === variant.size ? 'bold' : 'normal' 
            }}
          >
            {variant.size}
          </button>
        ))}
      </ul>
      {selectedVariant && (
        <div>
          <p>Price: {selectedVariant.price}€</p>
          <div>
            <label>Quantity: </label>
            <input
              type='number'
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
            />
          </div>
          <div className='total'>
            Total price: {calculateTotalPrice()}€
          </div>
          <button onClick={handleAddToCart}>Add to Cart</button> {/* Add to Cart button */}
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
