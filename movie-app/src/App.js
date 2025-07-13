import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

function App() {
  const firebaseUrl = 'https://movie-app-ba885-default-rtdb.firebaseio.com/movies.json';
  const firebaseBase = 'https://movie-app-ba885-default-rtdb.firebaseio.com/movies/';

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newMovie, setNewMovie] = useState({ title: '', body: '' });

  // Fetch movies
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(firebaseUrl);
      if (!response.ok) {
        throw new Error('Something went wrong while fetching movies.');
      }
      const moviesData = await response.json();
      const loadedMovies = [];
      for (const key in moviesData) {
        loadedMovies.push({
          id: key,
          title: moviesData[key].title,
          body: moviesData[key].body,
        });
      }
      setData(loadedMovies.reverse());
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }, [firebaseUrl]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMovie((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add new movie and refetch
  const handleAddMovie = useCallback(async () => {
    const movieObj = {
      title: newMovie.title,
      body: newMovie.body,
    };

    console.log('New Movie Object:', movieObj);

    try {
      const response = await fetch(firebaseUrl, {
        method: 'POST',
        body: JSON.stringify(movieObj),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Something went wrong while adding movie.');
      }

      fetchData();
    } catch (error) {
      setError(error.message);
      console.error('Failed to add movie:', error);
    }

    setNewMovie({ title: '', body: '' });
  }, [newMovie, firebaseUrl, fetchData]);

  // Delete movie
  const handleDeleteMovie = useCallback(
    async (id) => {
      try {
        const response = await fetch(`${firebaseBase}${id}.json`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete movie.');
        }

        // Update UI by re-fetching data
        fetchData();
      } catch (error) {
        setError(error.message);
        console.error('Failed to delete movie:', error);
      }
    },
    [firebaseBase, fetchData]
  );

  return (
    <div className="App">
      <h1>Movie App</h1>

      <div className="form-container">
        <input
          type="text"
          name="title"
          placeholder="Enter movie title"
          value={newMovie.title}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="body"
          placeholder="Enter movie description"
          value={newMovie.body}
          onChange={handleInputChange}
        />
        <button onClick={handleAddMovie}>Add Movie</button>
      </div>

      <button onClick={fetchData}>Fetch Movies</button>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">❌ {error}</p>}

      <ul className="movie-list">
        {data.map((item) => (
          <li key={item.id} className="movie-item">
            <strong>{item.title}</strong>: {item.body}
            <button onClick={() => handleDeleteMovie(item.id)} className="delete-button">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
