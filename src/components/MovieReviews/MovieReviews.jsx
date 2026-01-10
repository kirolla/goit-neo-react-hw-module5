import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchMovieReviews } from '../../services/tmdbApi';

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchMovieReviews(movieId).then(setReviews);
  }, [movieId]);

  if (!reviews.length) return <p>No reviews found</p>;

  return (
    <ul>
      {reviews.map(review => (
        <li key={review.id}>
          <h4>{review.author}</h4>
          <p>{review.content}</p>
        </li>
      ))}
    </ul>
  );
}
