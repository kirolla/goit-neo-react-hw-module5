import { useEffect, useState } from 'react';
import { fetchTrendingMovies } from '../../services/tmdbApi';
import MovieList from '../../components/MovieList/MovieList';

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchTrendingMovies()
      .then(setMovies)
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Trending Movies</h1>
      {movies.length > 0 ? <MovieList movies={movies} /> : <p>No movies found</p>}
    </div>
  );
}
