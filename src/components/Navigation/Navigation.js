import s from './Navigation.module.scss';

import { NavLink } from 'react-router-dom';

export function Navigation() {
  return (
    <header className={s.pageHeader}>
      <nav>
        <NavLink className={s.link} activeClassName={s.activeLink} exact to="/">
          Home
        </NavLink>
        <NavLink className={s.link} activeClassName={s.activeLink} to="/movies">
          Movies
        </NavLink>
      </nav>
    </header>
  );
}
