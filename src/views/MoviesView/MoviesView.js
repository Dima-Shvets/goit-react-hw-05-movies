import { useEffect, useState } from 'react';
import { Link, useRouteMatch, useHistory, useLocation } from 'react-router-dom';

import { fetchSearchedMovies } from '../../services/movies-service';
import SearchBar from '../../components/SearchBar';

import s from './MoviesView.module.scss';

function MoviesView() {
  const { url } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();
  const searchQueryValue =
    new URLSearchParams(location.search).get('query') ?? '';

  const [searchedMovies, setSearchedMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState(searchQueryValue);

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }

    fetchSearchedMovies(searchQuery).then(({ results }) =>
      setSearchedMovies(results),
    );
  }, [searchQuery]);

  const handleFormSubmit = inputValue => {
    setSearchQuery(inputValue);

    history.push({
      ...location,
      search: `query=${inputValue}`,
    });
  };

  return (
    <section className={s.MoviesView}>
      <SearchBar handleFormSubmit={handleFormSubmit} />
      {
        <ul className={s.list}>
          {searchedMovies.map(movie => (
            <li key={movie.id}>
              <Link to={`${url}/${movie.id}`}>{movie.title}</Link>
            </li>
          ))}
        </ul>
      }
    </section>
  );
}

export default MoviesView;
