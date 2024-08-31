import React from 'react';

const Cart = ({ cart }) => {
  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + parseFloat(item.totalPrice), 0).toFixed(2);
  };

  return (
    <div className='page'>
      <div className='content'>

      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                <p>{item.name} ({item.variant}) - {item.quantity} x {item.price} = ${item.totalPrice}</p>
              </li>
            ))}
          </ul>
          <h3>Total: ${calculateTotal()}</h3>
        </div>
      )}
      </div>
    </div>
  );
};

export default Cart;
