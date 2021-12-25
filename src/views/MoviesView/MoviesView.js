import { useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { fetchSearchedMovies } from '../../services/movies-service';

function MoviesView() {
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const { url } = useRouteMatch();

  const handleInputChange = e => {
    setInputValue(e.target.value);
  };

  const handleFormSubmit = e => {
    e.preventDefault();

    setSearchQuery(inputValue);
  };

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }

    fetchSearchedMovies(searchQuery).then(setSearchedMovies);
  }, [searchQuery]);

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button type="submit">Search</button>
      </form>
      <ul>
        {searchedMovies.map(movie => (
          <li key={movie.id}>
            <Link to={`${url}/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default MoviesView;
