import { Navigation } from './components/Navigation';
import './App.css';
import { Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

import HomePageView from './views/HomePageView';
import MoviesView from './views/MoviesView';
import { fetchTrendingMovies } from './services/movies-service';

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchTrendingMovies().then(setMovies);
  }, []);

  console.log(movies);

  return (
    <>
      <Navigation />
      <Route path="/" exact>
        <HomePageView movies={movies} />
      </Route>
      <Route path="/movies">
        <MoviesView />
      </Route>
    </>
  );
}

export default App;
