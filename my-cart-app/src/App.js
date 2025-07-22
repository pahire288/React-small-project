import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleCart } from "./store/cartSlice";

function App() {
  const dispatch = useDispatch();
  const isVisible = useSelector((state) => state.cart.isVisible);

  return (
    <div>
      <button onClick={() => dispatch(toggleCart())}>My Cart</button>
      {isVisible && <div style={{ border: "1px solid black", padding: "10px" ,height:"500px",width:"400px",backgroundColor:"darkblue"}}>Cart Items Here</div>}
    </div>
  );
}

export default App;
