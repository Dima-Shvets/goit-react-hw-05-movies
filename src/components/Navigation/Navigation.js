import { NavLink } from 'react-router-dom';

export function Navigation() {
  return (
    <>
      <NavLink exact to="/">
        Home
      </NavLink>
      <NavLink to="/movies">Movies</NavLink>
    </>
  );
}
