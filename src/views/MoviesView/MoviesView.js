import { useEffect, useState } from 'react';
import { fetchSearchedMovies } from '../../services/movies-service';

function MoviesView() {
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

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
      <ul></ul>
    </>
  );
}

export default MoviesView;
