import { useEffect, useState, useRef } from 'react';
import {
  Link,
  NavLink,
  Outlet,
  useParams,
  useLocation,
} from 'react-router-dom';
import { fetchMovieDetails } from '../../services/tmdbApi';
import styles from './MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();

  const backLinkRef = useRef(null);
  const [backLink, setBackLink] = useState('/movies');
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    backLinkRef.current = location.state?.from || '/movies';
    setBackLink(backLinkRef.current);
  }, [location.state]);

  useEffect(() => {
    fetchMovieDetails(movieId).then(setMovie);
  }, [movieId]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <Link to={backLink} className={styles.backLink}>
        ← Go back
      </Link>

      <div className={styles.movieWrapper}>

        {movie.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={movie.title}
            className={styles.poster}
          />
        )}


        <div className={styles.info}>
          <h2>
            {movie.title} ({movie.release_date?.slice(0, 4)})
          </h2>
          <p>
            <strong>User Score:</strong> {Math.round(movie.vote_average * 10)}%
          </p>

          <h3>Overview</h3>
          <p>{movie.overview}</p>

          <h3>Genres</h3>
          <p>{movie.genres.map((g) => g.name).join(', ')}</p>
        </div>
      </div>

      <div className={styles.additional}>
        <div className={styles.bar} /> 

        <h3>Additional information</h3>

        <ul className={styles.additionalLinks}>
          <li>
            <NavLink
              to="cast"
              className={({ isActive }) => (isActive ? styles.activeLink : '')}
            >
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink
              to="reviews"
              className={({ isActive }) => (isActive ? styles.activeLink : '')}
            >
              Reviews
            </NavLink>
          </li>
        </ul>

        <div className={styles.bar} /> 

        <Outlet />
      </div>
    </div>
  );
}
