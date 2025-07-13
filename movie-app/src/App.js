import React, { useState, useEffect, useCallback, useMemo } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryIntervalId, setRetryIntervalId] = useState(null);
  const [newMovie, setNewMovie] = useState({ title: '', body: '' });

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      if (!response.ok) {
        throw new Error('Something went wrong');
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      setError(error.message);
      console.error('API call failed:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch data on page load
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Retry API call every 5 seconds if there is an error
  useEffect(() => {
    if (error) {
      const intervalId = setInterval(() => {
        console.log('Retrying API call...');
        fetchData();
      }, 5000);
      setRetryIntervalId(intervalId);

      return () => clearInterval(intervalId);
    }
  }, [error, fetchData]);

  const cancelRetry = useCallback(() => {
    if (retryIntervalId) {
      clearInterval(retryIntervalId);
      setRetryIntervalId(null);
      console.log('Retry cancelled.');
    }
  }, [retryIntervalId]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setNewMovie(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleAddMovie = useCallback(() => {
    const movieWithId = {
      ...newMovie,
      id: data ? data.length + 1 : 1, // temporary id for display
    };

    console.log('New Movie Object:', movieWithId);

    // Update state to display the new movie immediately
    setData(prevData => prevData ? [movieWithId, ...prevData] : [movieWithId]);

    // Reset form inputs
    setNewMovie({ title: '', body: '' });
  }, [newMovie, data]);

  const memoizedMovies = useMemo(() => data, [data]);

  return (
    <div className="App">
      <h1>Movie App</h1>

      <div className="form-container">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newMovie.title}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="body"
          placeholder="Description"
          value={newMovie.body}
          onChange={handleInputChange}
        />
        <button onClick={handleAddMovie}>Add Movie</button>
      </div>

      <button onClick={fetchData}>Fetch Movies</button>
      {error && (
        <div className="error">
          <p>Something went wrong: {error}</p>
          <button onClick={cancelRetry}>Cancel Retry</button>
        </div>
      )}
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <ul>
          {memoizedMovies && memoizedMovies.map(movie => (
            <li key={movie.id}>
              <strong>{movie.title}</strong>: {movie.body}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
