import React, { useState } from 'react';
import axios from 'axios';

const API_KEY = '39fcf14b'; 

export default function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchMovies = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);
      if (res.data.Response === 'True') {
        setMovies(res.data.Search);
      } else {
        setError(res.data.Error);
        setMovies([]);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') searchMovies();
  };

  const handleClear = () => {
    setMovies([]);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-sans">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">🎬 Movie Search App</h1>

        {/* Search Input */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            placeholder="Type movie title..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={searchMovies}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Search
          </button>
          <button
            onClick={handleClear}
            className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
          >
            Clear
          </button>
        </div>

        {/* Loading/Error */}
        {loading && <p className="text-center text-blue-500">Loading...</p>}
        {error && <p className="text-center text-red-600">{error}</p>}

        {/* Movie Results */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {movies.map((movie) => (
            <div
              key={movie.imdbID}
              className="bg-white rounded-lg shadow p-4 flex flex-col items-center"
            >
              <img
                src={movie.Poster !== 'N/A' ? movie.Poster : 'https://i.ibb.co/vCyMXnRN/download.jpg'}
                alt={movie.Title}
                className="w-full h-64 object-cover rounded mb-3"
              />
              <h2 className="font-semibold text-lg text-center">{movie.Title}</h2>
              <p className="text-gray-500">{movie.Year}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
