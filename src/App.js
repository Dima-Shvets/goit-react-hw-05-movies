import { Navigation } from './components/Navigation';
import './App.css';
import { Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

import HomePageView from './views/HomePageView';
import MoviesView from './views/MoviesView';
import MovieDetailsView from './views/MovieDetailsView';
import { fetchTrendingMovies } from './services/movies-service';

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchTrendingMovies().then(({ results }) => setMovies(results));
  }, []);

  return (
    <>
      <Navigation />
      <Route path="/" exact>
        <HomePageView movies={movies} />
      </Route>
      <Route path="/movies" exact>
        <MoviesView />
      </Route>
      <Route path="/movies/:movieId">
        <MovieDetailsView />
      </Route>
    </>
  );
}

export default App;
