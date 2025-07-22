import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../features/cartSlice';

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const cartItem = cartItems.find(item => item.id === product.id);
  const count = cartItem ? cartItem.count : 0;

  const handleAdd = () => {
    dispatch(addItem(product));
  };

  const cardStyle = {
    border: '1px solid #ccc',
    padding: '10px',
    margin: '10px',
    borderRadius: '8px',
  };

  return (
    <div style={cardStyle}>
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button onClick={handleAdd}>
        Add {count > 0 && `(${count})`}
      </button>
    </div>
  );
}

export default ProductCard;
