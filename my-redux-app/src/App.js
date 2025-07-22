// src/App.js

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

function App() {
  const count = useSelector(state => state.count);
  const isAuthenticated = useSelector(state => state.isAuthenticated);
  const dispatch = useDispatch();

  if (!isAuthenticated) {
    // ✅ Login Screen with inline CSS
    return (
      <div
        style={{
          textAlign: 'center',
          marginTop: '50px',
          backgroundColor: '#f2f2f2',
          height: '100vh',
          paddingTop: '100px',
        }}
      >
        <h2 style={{ marginBottom: '20px' }}>Login Screen</h2>
        <button
          onClick={() => dispatch({ type: 'LOGIN' })}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Login
        </button>
      </div>
    );
  }

  // ✅ Logged In Screen with inline CSS
  return (
    <div
      style={{
        textAlign: 'center',
        marginTop: '50px',
        backgroundColor: '#e6f7ff',
        height: '100vh',
        paddingTop: '50px',
      }}
    >
      <h2 style={{ marginBottom: '20px' }}>Welcome! You are logged in.</h2>
      <h2 style={{ marginBottom: '30px' }}>Count: {count}</h2>

      {/* Increment by 5 */}
      <button
        onClick={() => {
          for (let i = 0; i < 5; i++) {
            dispatch({ type: 'INCREMENT' });
          }
        }}
        style={{
          margin: '10px',
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Increment by 5
      </button>

      {/* Decrement by 5 */}
      <button
        onClick={() => dispatch({ type: 'DECREMENT' })}
        style={{
          margin: '10px',
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#f44336',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Decrement by 5
      </button>

      {/* Logout */}
      <button
        onClick={() => dispatch({ type: 'LOGOUT' })}
        style={{
          display: 'block',
          margin: '30px auto 0 auto',
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: 'gray',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default App;
