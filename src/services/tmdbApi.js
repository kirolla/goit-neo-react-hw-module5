import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNmMwYWNjMDRmZTI2ZmQ0ZjhkNjY5N2Y5OTNlZmMxZSIsIm5iZiI6MTc2NzM2Nzg0MC45NjUsInN1YiI6IjY5NTdlNGEwNjA1MGQxYzE3NWQ3YWZjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qm4zqqRoxC6Am3kth3U4TYiLhONduIxKmCuQJo_-QSQ';

const options = {
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
};

export async function fetchTrendingMovies() {
  const response = await axios.get(
    `${BASE_URL}/trending/movie/day?language=en-US`,
    options
  );
  return response.data.results;
}

export async function searchMoviesByQuery(query) {
  const response = await axios.get(
    `${BASE_URL}/search/movie?query=${query}&language=en-US&include_adult=false`,
    options
  );
  return response.data.results;
}

export async function fetchMovieDetails(movieId) {
  const response = await axios.get(
    `${BASE_URL}/movie/${movieId}?language=en-US`,
    options
  );
  return response.data;
}

export async function fetchMovieCast(movieId) {
  const response = await axios.get(
    `${BASE_URL}/movie/${movieId}/credits?language=en-US`,
    options
  );
  return response.data.cast;
}

export async function fetchMovieReviews(movieId) {
  const response = await axios.get(
    `${BASE_URL}/movie/${movieId}/reviews?language=en-US`,
    options
  );
  return response.data.results;
}
