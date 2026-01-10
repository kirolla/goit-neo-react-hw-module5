import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchMovieCast } from '../../services/tmdbApi';
import styles from './MovieCast.module.css';

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    fetchMovieCast(movieId).then(setCast);
  }, [movieId]);

  if (!cast.length) return <p>No cast info</p>;

  return (
    <ul className={styles.castList}>
      {cast.map(actor => (
        <li key={actor.id} className={styles.castItem}>
          {actor.profile_path && (
            <img
              src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
              alt={actor.name}
              width="100"
            />
          )}
          <p className={styles.nameRow}>
            <span className={styles.dot}></span>
            <span className={styles.name}>{actor.name}</span>
          </p>
          <p className={styles.character}>Character: {actor.character}</p>
        </li>
      ))}
    </ul>
  );
}