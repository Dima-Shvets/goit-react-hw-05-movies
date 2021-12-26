import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { fetchMovieById } from '../../services/movies-service';

function MovieDetailsView() {
  const [movie, setMovie] = useState({});
  const { title, release_date, vote_average, overview, genres, poster_path } =
    movie;

  const { movieId } = useParams();

  useEffect(() => {
    fetchMovieById(movieId).then(setMovie);
  }, [movieId]);

  const separateYear = date => {
    const dateArray = date.split('-');

    return dateArray[0];
  };

  const turnNumberRatingIntoPecent = rating => {
    return (rating / 10) * 100;
  };

  return (
    Object.keys(movie).length !== 0 && (
      <div>
        <img
          src={`https://themoviedb.org/t/p/w1280${poster_path}`}
          alt={'qwe'}
          width="200"
        />
        <h2>{`${title} (${separateYear(release_date)})`}</h2>
        <p>User score: {turnNumberRatingIntoPecent(vote_average)}%</p>
        <h3>Overview</h3>
        <p>{overview}</p>
        <h3>Genres</h3>
        <ul>
          {genres.map(genre => (
            <li key={genre.id}>{genre.name}</li>
          ))}
        </ul>
      </div>
    )
  );
}

export default MovieDetailsView;
