import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem } from '../features/cartSlice';

function Cart() {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const handleRemove = (itemId) => {
    dispatch(removeItem(itemId));
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.count, 0);

  const cartStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    width: '300px',
    marginTop: '20px',
  };

  return (
    <div style={cartStyle}>
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        cartItems.map(item => (
          <div key={item.id} style={{ marginBottom: '10px' }}>
            <p>{item.name} x {item.count}</p>
            <p>${item.price * item.count}</p>
            <button onClick={() => handleRemove(item.id)}>Remove</button>
          </div>
        ))
      )}
      <h3>Total: ${totalPrice}</h3>
    </div>
  );
}

export default Cart;
