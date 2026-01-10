import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMoviesByQuery } from '../../services/tmdbApi';
import MovieList from '../../components/MovieList/MovieList';
import styles from './MoviesPage.module.css'; 

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';

  useEffect(() => {
    if (!query) return;
    searchMoviesByQuery(query).then(setMovies);
  }, [query]);

  const handleSubmit = e => {
    e.preventDefault();
    const value = e.target.elements.query.value.trim();
    if (!value) return;
    setSearchParams({ query: value });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <input name="query" className={styles.searchInput} />
        <button type="submit" className={styles.searchButton}>Search</button>
      </form>

      {movies.length > 0 && <MovieList movies={movies} />}
    </>
  );
}
