import { Link, useRouteMatch, useLocation } from 'react-router-dom';

import s from './HomePageView.module.scss';

function HomePageView({ movies }) {
  const location = useLocation();

  const { url } = useRouteMatch();

  return (
    <section className={s.HomePage}>
      <h1 className={s.title}>Trending Today</h1>
      <ul>
        {movies.map(movie => (
          <li className={s.item} key={movie.id}>
            <Link
              to={{
                pathname: `${url}movies/${movie.id}`,
                state: {
                  from: {
                    location,
                    label: 'Back to home page',
                  },
                },
              }}
            >
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default HomePageView;
