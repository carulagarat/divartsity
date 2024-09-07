import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const ProductDetail = ({ products, addToCart }) => {
  const { id } = useParams();
  const product = products.find(p => p.id.toString() === id);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isUnpainted, setIsUnpainted] = useState(false);

  useEffect(() => {
    if (product && product.variants.length > 0 && !selectedVariant) {
      setSelectedVariant(product.variants[0]); // Set the first variant as default
    }
  }, [product, selectedVariant]);
  
  if (!product) {
    return <p>Product not found!</p>;
  }

  const handleVariantSelect = (e) => {
    const selectedSize = e.target.value;
    const variant = product.variants.find(v => v.size === selectedSize);
    setSelectedVariant(variant);
  };

  const handleQuantityChange = (e) => {
    setQuantity(Number(e.target.value));
  };

  const handleUnpaintedChange = (e) => {
    setIsUnpainted(e.target.checked);
  };

  const calculateTotalPrice = () => {
    if (!selectedVariant) return "0.00";
    
    let price = typeof selectedVariant.price === 'number' 
      ? selectedVariant.price 
      : parseFloat(selectedVariant.price.replace('€', ''));
  
    if (isUnpainted) {
      price *= product.unpainted;
    }
  
    return (price * quantity).toFixed(2);
  };
  
  const calculateVariantPrice = () => {
    if (!selectedVariant) return "0.00";
  
    let price = typeof selectedVariant.price === 'number' 
      ? selectedVariant.price 
      : parseFloat(selectedVariant.price.replace('€', ''));
  
    if (isUnpainted) {
      price *= product.unpainted;
    }
    return price.toFixed(2);
  };
  
  const handleAddToCart = () => {
    if (selectedVariant && quantity > 0) {
      const item = {
        productId: product.id,
        name: product.name,
        variant: selectedVariant.size,
        price: calculateTotalPrice(),
        quantity: quantity,
        totalPrice: calculateTotalPrice()
      };
      addToCart(item);
      setQuantity(1);
    }
  };

  // Calculate the discount percentage
  const discountPercentage = ((1 - product.unpainted) * 100).toFixed(0);

  return (
    <div className='page'>
      <div className='content'>
        <div className='row product-detail'>

        <div className="product-images">
          <Carousel
            showArrows={true}
            autoPlay={false}
            infiniteLoop={true}
            showThumbs={false}
            swipeable={true}
            emulateTouch={true}
            showStatus={false}
          >
            {Array.from({ length: product.images }, (_, index) => (
              <div key={index}>
                <img 
                  src={`/divartsity/images/product-images/${product.id}/gallery/${product.id}_${index + 1}.jpg`} 
                  alt={`${product.name} image ${index + 1}`} 
                />
              </div>
            ))}
          </Carousel>
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

        <div className='filters row stretch product-selection'>


          <div className='column'>

            {selectedVariant && (
              <div className='img-dimensions'>
                <img 
                  src={`/divartsity/images/product-images/${product.id}/${product.id}-dimensions.jpg`} 
                  alt={`${product.name} dimensions`} 
                />
                <span className='width'>{selectedVariant.dimensions.width}cm</span>
                <span className='height'>{selectedVariant.dimensions.height}cm</span>
              </div>
            )}

            <div className='fieldWrapper'>
              <div className='field'>
                  <select name="scale" value={selectedVariant?.size || ''} onChange={handleVariantSelect}>
                    {product.variants.map((variant, index) => (
                      <option key={index} value={variant.size}>
                        {variant.size}
                      </option>
                    ))}
                  </select>
                  <label htmlFor='scale'>Scale</label>
                  <FontAwesomeIcon icon={faChevronDown} />
              </div>
            </div>

          </div>
          <div className='field checkbox'>
            <input 
              type='checkbox' 
              name='unpainted' 
              checked={isUnpainted} 
              onChange={handleUnpaintedChange} 
            />
            <label htmlFor='unpainted'>Unpainted</label>
          </div>
          
          <div className='column checkout'>
            {selectedVariant && (
              <div className='prePrice row fullwidth bottom right'>
                <div className='row middle'>

                  {isUnpainted ? (
                    <div className='row middle'>
                      <span className='prevPrice'>
                        {selectedVariant.price}€
                      </span>
                      <span className='offer'>
                        -{discountPercentage}%
                      </span>
                    </div>
                  ) : null }

                  <p className='price'>{calculateVariantPrice()}€</p>
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
              </div>
            )}

            <div className='row fullwidth right'>
              <div className='row middle right total'>
                <div className='price'>
                  <span>Total price:</span> {calculateTotalPrice()}€
                </div>
                <button className='primary' onClick={handleAddToCart}>Add to Cart</button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetail;
