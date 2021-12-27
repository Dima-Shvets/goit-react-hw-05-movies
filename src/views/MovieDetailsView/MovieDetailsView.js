import {
  useParams,
  useLocation,
  useHistory,
  NavLink,
  useRouteMatch,
  Route,
} from 'react-router-dom';
import { useEffect, useState } from 'react';

import { fetchMovieById } from '../../services/movies-service';
import CastView from '../CastView';
import ReviewsView from '../ReviewsView';
import GoBackButton from '../../components/GoBackButton';

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
    return (rating / 10) * 100;
  };

  return (
    <>
      <GoBackButton
        handleGoBackButtonClick={handleGoBackButtonClick}
        label={location?.state?.from?.label ?? 'Go back'}
      />
      {movie && (
        <div>
          <img
            src={`https://themoviedb.org/t/p/w1280${movie.poster_path}`}
            alt={`${movie.title} poster`}
            width="200"
          />
          <h2>{`${movie.title} (${separateYear(movie.release_date)})`}</h2>
          <p>User score: {turnNumberRatingIntoPecent(movie.vote_average)}%</p>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
          <h3>Genres</h3>
          <ul>
            {movie.genres.map(genre => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
        </div>
      )}
      <div>
        <h4>Additional information</h4>
        <ul>
          <li>
            <NavLink to={`${url}/cast`}>Cast</NavLink>
          </li>
          <li>
            <NavLink to={`${url}/reviews`}>Reviews</NavLink>
          </li>
        </ul>
      </div>

      <Route path="/movies/:movieId/cast" exact>
        <CastView movieId={movieId} />
      </Route>
      <Route path="/movies/:movieId/reviews" exact>
        <ReviewsView movieId={movieId} />
      </Route>
    </>
  );
}

export default MovieDetailsView;
