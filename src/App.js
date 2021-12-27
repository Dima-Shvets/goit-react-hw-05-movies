import { Navigation } from './components/Navigation';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { useState, useEffect, lazy, Suspense } from 'react';
import Loader from 'react-loader-spinner';

import { fetchTrendingMovies } from './services/movies-service';

const HomePageView = lazy(() =>
  import('./views/HomePageView' /* webpackChunkName: "home-page-view" */),
);
const MoviesView = lazy(() =>
  import('./views/MoviesView' /* webpackChunkName: "movies-view" */),
);
const MovieDetailsView = lazy(() =>
  import(
    './views/MovieDetailsView' /* webpakcChunkName: "movie-detail-view" */
  ),
);
const NotFoundView = lazy(() => import('./views/NotFoundView'));

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchTrendingMovies().then(({ results }) => setMovies(results));
  }, []);

  return (
    <>
      <Navigation />
      <Suspense
        fallback={
          <Loader
            className="Loader"
            type="BallTriangle"
            color="#3f51b5"
            height={150}
            width={150}
          />
        }
      >
        <Switch>
          <Route path="/" exact>
            <HomePageView movies={movies} />
          </Route>
          <Route path="/movies" exact>
            <MoviesView />
          </Route>
          <Route path="/movies/:movieId">
            <MovieDetailsView />
          </Route>
          <Route>
            <NotFoundView />
          </Route>
        </Switch>
      </Suspense>
    </>
  );
}

export default App;
