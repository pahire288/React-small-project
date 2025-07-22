import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/cartSlice";

const products = [
  { id: 1, name: "Apple", price: 10 },
  { id: 2, name: "Banana", price: 5 },
];

const ProductList = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div>
      <h2>Products</h2>
      <div>Cart 🛒 {cartCount}</div>
      {products.map(product => (
        <div key={product.id} style={{ border: "1px solid black", margin: "5px", padding: "5px" }}>
          <p>{product.name} - ₹{product.price}</p>
          <button onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
