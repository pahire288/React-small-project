import React, { useState } from 'react';
import './App.css';

function App() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchShowsHandler = () => {
    setLoading(true);

    fetch('https://api.tvmaze.com/shows')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
        return response.json();
      })
      .then((data) => {
        setShows(data.slice(0, 10)); // show only first 10 results for simplicity
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  return (
    <div className="App">
      <h1>TV Shows App</h1>
      <button onClick={fetchShowsHandler}>Fetch TV Shows</button>

      {loading && <p>Loading...</p>}

      {!loading && shows.length > 0 && (
        <ul>
          {shows.map((show) => (
            <li key={show.id}>
              <h3>{show.name}</h3>
              {show.image && (
                <img
                  src={show.image.medium}
                  alt={show.name}
                  style={{ width: '150px' }}
                />
              )}
            </li>
          ))}
        </ul>
      )}

      {!loading && shows.length === 0 && <p>No shows found. Click fetch.</p>}
    </div>
  );
}

export default App;
