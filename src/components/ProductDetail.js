import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = ({ products }) => {
  const { id } = useParams();
  const product = products.find(p => p.id.toString() === id);

  if (!product) {
    return <p>Product not found!</p>;
  }

  return (
    <div>
      <div className="product-images">
        {product.images.map((image, index) => (
          <img key={index} src={image} alt={`${product.name} image ${index + 1}`} />
        ))}
      </div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <h3>Variants</h3>
      <ul>
        {product.variants.map((variant, index) => (
          <li key={index}>
            <strong>{variant.size}:</strong> {variant.price} <br />
            Dimensions: {variant.dimensions.width} x {variant.dimensions.height} x {variant.dimensions.depth}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductDetail;
