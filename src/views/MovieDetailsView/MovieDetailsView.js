import {
  useParams,
  useLocation,
  useHistory,
  NavLink,
  useRouteMatch,
  Route,
} from 'react-router-dom';
import { useEffect, useState, lazy, Suspense } from 'react';
import Loader from 'react-loader-spinner';

import { fetchMovieById } from '../../services/movies-service';
import GoBackButton from '../../components/GoBackButton';

import s from './MoviesDetailsView.module.scss';

const CastView = lazy(() =>
  import('../CastView' /* webpackChunkName: "cast-view" */),
);
const ReviewsView = lazy(() =>
  import('../ReviewsView' /* webpackChunkName: "reviews-view" */),
);

function MovieDetailsView() {
  const { movieId } = useParams();
  const { url } = useRouteMatch();
  const location = useLocation();
  const history = useHistory();

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetchMovieById(movieId).then(setMovie);
  }, [movieId]);

  const handleGoBackButtonClick = () => {
    history.push(location?.state?.from?.location ?? '/movies');
  };

  const separateYear = date => {
    const dateArray = date.split('-');

    return dateArray[0];
  };

  const turnNumberRatingIntoPecent = rating => {
    return Math.floor((rating / 10) * 100);
  };

  return (
    <section className={s.MovieDetailsView}>
      <GoBackButton
        handleGoBackButtonClick={handleGoBackButtonClick}
        label={location?.state?.from?.label ?? 'Go back'}
      />
      {movie && (
        <div className={s.movie}>
          <img
            className={s.poster}
            src={`https://themoviedb.org/t/p/w1280${movie.poster_path}`}
            alt={`${movie.title} poster`}
            width="250"
          />
          <div className={s.movieInformation}>
            <h2 className={s.element}>{`${movie.title} (${separateYear(
              movie.release_date,
            )})`}</h2>
            <p className={s.element}>
              User score: {turnNumberRatingIntoPecent(movie.vote_average)}%
            </p>
            <h3 className={s.element}>Overview</h3>
            <p className={s.element}>{movie.overview}</p>
            <h3 className={s.element}>Genres</h3>
            <ul className={s.element}>
              {movie.genres.map(genre => (
                <li key={genre.id}>{genre.name}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <div className={s.additionalInformation}>
        <h3 className={s.informationTitle}>Additional information</h3>
        <ul>
          <li>
            <NavLink to={`${url}/cast`}>Cast</NavLink>
          </li>
          <li>
            <NavLink to={`${url}/reviews`}>Reviews</NavLink>
          </li>
        </ul>
      </div>
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
        <Route path="/movies/:movieId/cast" exact>
          <CastView movieId={movieId} />
        </Route>
        <Route path="/movies/:movieId/reviews" exact>
          <ReviewsView movieId={movieId} />
        </Route>
      </Suspense>
    </section>
  );
}

export default MovieDetailsView;
