import { Link, useRouteMatch, useLocation } from 'react-router-dom';

function HomePageView({ movies }) {
  const location = useLocation();

  const { url } = useRouteMatch();

  return (
    <>
      <h1>Trending Today</h1>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
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
    </>
  );
}

export default HomePageView;
