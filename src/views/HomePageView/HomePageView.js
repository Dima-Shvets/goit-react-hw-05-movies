import { Link, useRouteMatch } from 'react-router-dom';

function HomePageView({ movies }) {
  const { url } = useRouteMatch();
  // const {original_title} = movies

  return (
    <>
      <h1>Tending Today</h1>
      <ul>
        {movies.map(movie => (
          <li>
            <Link key={movie.id} to={`${url}/movies/${movie.id}`}>
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default HomePageView;
