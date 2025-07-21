// src/App.js

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

function App() {
  const count = useSelector(state => state.count);
  const dispatch = useDispatch();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Count: {count}</h2>

      {/* Increment by 5 by dispatching increment action 5 times */}
      <button
        onClick={() => {
          for (let i = 0; i < 5; i++) {
            dispatch({ type: 'INCREMENT' });
          }
        }}
        style={{ margin: '10px' }}
      >
        Increment by 5
      </button>

      {/* Decrement by 1 */}
      <button
        onClick={() => dispatch({ type: 'DECREMENT' })}
        style={{ margin: '10px' }}
      >
        Decrement by 1
      </button>
    </div>
  );
}

export default App;
