import React, { useState, useEffect, useRef } from 'react';
import './App.css'; // Import CSS

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [retrying, setRetrying] = useState(false);
  const retryTimeout = useRef(null);

  const fetchData = () => {
    setLoading(true);
    setError('');
    
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        if (!response.ok) {
          throw new Error('API responded with an error');
        }
        return response.json();
      })
      .then(data => {
        setData(data);
        setLoading(false);
        setRetrying(false);
        clearTimeout(retryTimeout.current);
      })
      .catch(err => {
        setError('Something went wrong: ' + err.message);
        setLoading(false);
        setRetrying(true);

        retryTimeout.current = setTimeout(() => {
          fetchData();
        }, 5000);
      });
  };

  const cancelRetry = () => {
    setRetrying(false);
    clearTimeout(retryTimeout.current);
  };

  useEffect(() => {
    return () => clearTimeout(retryTimeout.current);
  }, []);

  return (
    <div className="app-container">
      <h1>Movie App</h1>
      <button className="fetch-btn" onClick={fetchData}>Fetch Data</button>

      {loading && <div className="spinner"></div>}

      {error && <p className="error">{error}</p>}

      {retrying && (
        <div className="retry-container">
          <p>Retrying in 5 seconds...</p>
          <button className="cancel-btn" onClick={cancelRetry}>Cancel Retry</button>
        </div>
      )}

      {data && (
        <ul className="data-list">
          {data.map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
