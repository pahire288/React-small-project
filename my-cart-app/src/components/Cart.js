import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increaseQuantity, decreaseQuantity } from "../store/cartSlice";

const Cart = () => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>My Cart</h2>
      {cartItems.length === 0 && <p>Cart is empty</p>}
      {cartItems.map(item => (
        <div key={item.id} style={{ border: "1px solid gray", margin: "5px", padding: "5px" }}>
          <p>{item.name} - ₹{item.price} x {item.quantity}</p>
          <button onClick={() => dispatch(increaseQuantity(item.id))}>+</button>
          <button onClick={() => dispatch(decreaseQuantity(item.id))}>-</button>
        </div>
      ))}
    </div>
  );
};

export default Cart;
