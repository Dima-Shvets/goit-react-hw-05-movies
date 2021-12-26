import { useEffect, useState } from 'react';
import { Link, useRouteMatch, useHistory, useLocation } from 'react-router-dom';

import { fetchSearchedMovies } from '../../services/movies-service';
import SearchBar from '../../components/SearchBar';

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
    <>
      <SearchBar handleFormSubmit={handleFormSubmit} />
      {
        <ul>
          {searchedMovies.map(movie => (
            <li key={movie.id}>
              <Link to={`${url}/${movie.id}`}>{movie.title}</Link>
            </li>
          ))}
        </ul>
      }
    </>
  );
}

export default MoviesView;
