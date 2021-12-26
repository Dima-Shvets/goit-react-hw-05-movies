import { useState, useEffect } from 'react';

import { fetchCast } from '../../services/movies-service';

function CastView({ movieId }) {
  const [cast, setCast] = useState(null);

  useEffect(() => {
    fetchCast(movieId).then(({ cast }) => setCast(cast));
  }, [movieId]);

  return (
    <ul>
      {cast &&
        cast.map(castMember => {
          const { id, name, profile_path, character } = castMember;
          return (
            <li key={id}>
              {profile_path ? (
                <img
                  src={`https://themoviedb.org/t/p/w1280${profile_path}`}
                  alt={name}
                  width="100"
                />
              ) : (
                <p>Sorry there is no photo</p>
              )}
              <p>{name}</p>
              <p>Character: {character}</p>
            </li>
          );
        })}
    </ul>
  );
}

export default CastView;
