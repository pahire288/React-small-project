import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [retrying, setRetrying] = useState(false);
  const retryTimeout = useRef(null);

  const fetchData = useCallback(() => {
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
  }, []);

  const cancelRetry = useCallback(() => {
    setRetrying(false);
    clearTimeout(retryTimeout.current);
  }, []);

  useEffect(() => {
    // Call API when component mounts
    fetchData();

    return () => clearTimeout(retryTimeout.current);
  }, [fetchData]);

  const renderedData = useMemo(() => {
    if (!data) return null;

    return (
      <ul className="data-list">
        {data.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    );
  }, [data]);

  return (
    <div className="app-container">
      <h1>Movie App</h1>

      {loading && <div className="spinner"></div>}

      {error && <p className="error">{error}</p>}

      {retrying && (
        <div className="retry-container">
          <p>Retrying in 5 seconds...</p>
          <button className="cancel-btn" onClick={cancelRetry}>Cancel Retry</button>
        </div>
      )}

      {renderedData}
    </div>
  );
}

export default App;
