import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = ({ products, addToCart }) => {
  const { id } = useParams();
  const product = products.find(p => p.id.toString() === id);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (product && product.variants.length > 0) {
      setSelectedVariant(product.variants[0]);
    }
  }, [product]);

  useEffect(() => {
    if (id) {
      fetch(`/api/images/${id}`)
        .then(response => response.json())
        .then(data => setImages(data))
        .catch(err => console.error(err));
    }
  }, [id]);

  if (!product) {
    return <p>Product not found!</p>;
  }

  const handleVariantSelect = (variant) => {
    setSelectedVariant(variant);
  };

  const handleQuantityChange = (e) => {
    setQuantity(Number(e.target.value));
  };

  const calculateTotalPrice = () => {
    if (!selectedVariant) return "0.00";
    const price = parseFloat(selectedVariant.price.replace('$', ''));
    return (price * quantity).toFixed(2);
  };

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
      setQuantity(1);
    }
  };

  return (
    <div className='page'>
      <div className='content'>

        <div className='row product-detail'>
          <div className="product-images">
            {images.map((image, index) => (
              <img key={index} src={image} alt={`${product.name} image ${index + 1}`} />
            ))}
          </div>
          <div className='product-info column'>
            <h1>{product.name}</h1>
            {product.scienceName ? <h2>{product.scienceName}</h2> : null}
            <div className='row classification'>
              <p>Order: {product.order}</p>
              <p>Family: {product.family}</p>
            </div>
            <p>{product.description}</p>
          </div>
        </div>

        <div className='filters row product-selection'>

          <div className='field group'>
            <label>Scale</label>
            <div className='options'>
              {product.variants.map((variant, index) => (
                <button
                  className={`tag${selectedVariant && selectedVariant.size === variant.size ? ' selected' : ''}`}
                  key={index}
                  onClick={() => handleVariantSelect(variant)}
                >
                  {variant.size}
                </button>
              ))}
            </div>
          </div>
          <div className='field checkbox'>
            <input type='checkbox' name='unpainted'/>
            <label htmlFor='unpainted'>Unpainted</label>
          </div>
        </div>

        {selectedVariant && (
          <div className='prePrice row fullwidth middle right'>
            <p className='dimensions'>
              <span>{selectedVariant.dimensions.width}</span>
              <span>x</span>
              <span>{selectedVariant.dimensions.height}</span>
              <span>x</span>
              <span>{selectedVariant.dimensions.depth}</span>
              <span>cm</span>
            </p>
            <p className='price'>{selectedVariant.price}<span>€</span></p>
            <span className='times'>x</span>
            <div className='field quantity'>
              <input
                name='quantity'
                type='number'
                value={quantity}
                onChange={handleQuantityChange}
                min="1"
              />
              <label htmlFor='quantity'>Quantity:</label>
            </div>
          </div>
        )}

        <div className='row fullwidth right'>
          <div className='total'>
            Total price: {calculateTotalPrice()}€
          </div>
          <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
