import { Link, useRouteMatch } from 'react-router-dom';

function HomePageView({ movies }) {
  const { url } = useRouteMatch();

  return (
    <>
      <h1>Tending Today</h1>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <Link to={`${url}movies/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default HomePageView;
