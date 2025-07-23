import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import database from './firebase';
import { ref, set, onValue } from "firebase/database";
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import products from './features/products';
import { setCart } from './features/cartSlice';

const App = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const [notification, setNotification] = useState("");
  const [loading, setLoading] = useState(true);

  // 🔵 Load cart from firebase on first load
  useEffect(() => {
    const cartRef = ref(database, 'cart/');
    onValue(cartRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        dispatch(setCart(data));
        console.log("Fetched cart from firebase:", data);
        setNotification("Cart loaded from Firebase ✅");
      } else {
        setNotification("No cart data found in Firebase.");
      }
      setLoading(false);
      setTimeout(() => setNotification(""), 3000);
    }, (error) => {
      console.error("Error fetching from firebase:", error);
      setNotification("Error loading cart ❌");
      setLoading(false);
      setTimeout(() => setNotification(""), 3000);
    });
  }, [dispatch]);

  // 🔴 Save cart to firebase whenever cartItems changes
  useEffect(() => {
    const saveCartToFirebase = async () => {
      try {
        setNotification("Saving cart data...");
        await set(ref(database, 'cart/'), cartItems);
        console.log("Cart data saved to firebase");
        setNotification("Cart data saved successfully ✅");
      } catch (error) {
        console.error("Error saving to firebase:", error);
        setNotification("Error saving cart data ❌");
      } finally {
        setTimeout(() => setNotification(""), 3000);
      }
    };

    if (cartItems.length > 0) {
      saveCartToFirebase();
    }
  }, [cartItems]);

  const appStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    padding: '20px',
  };

  const notificationStyle = {
    position: 'fixed',
    top: '20px',
    right: '20px',
    backgroundColor: '#4ade80', // green
    color: 'white',
    padding: '10px 20px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    zIndex: 1000,
  };

  return (
    <>
      {notification && (
        <div style={notificationStyle}>
          {notification}
        </div>
      )}

      {loading ? (
        <p style={{ textAlign: 'center', marginTop: '50px' }}>Loading cart data...</p>
      ) : (
        <div style={appStyle}>
          <div>
            <h1>Products</h1>
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <Cart />
        </div>
      )}
    </>
  );
};

export default App;
