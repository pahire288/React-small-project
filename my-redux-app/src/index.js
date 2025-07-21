import React from 'react';
import ReactDOM from 'react-dom/client'; // ✅ Use `react-dom/client` instead of `react-dom`
import { Provider } from 'react-redux';
import store from './store/store';
import App from './App';

// ✅ Create a root
const root = ReactDOM.createRoot(document.getElementById('root'));

// ✅ Use the new render
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
