const API_KEY = 'efd4d92644514b40e3f423461faca9a9';
const BASE_URL = 'https://api.themoviedb.org/3';

export function fetchTrendingMovies() {
  const url = `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`;

  return fetchMovies(url);
}

export function fetchSearchedMovies(query) {
  const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}`;

  return fetchMovies(url);
}

export function fetchMovieById(id) {
  const url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`;

  return fetchMovies(url);
}

async function fetchMovies(url) {
  const movies = await fetch(url).then(res => res.json());

  return movies;
}
