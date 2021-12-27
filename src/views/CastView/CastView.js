import { useState, useEffect } from 'react';

import { fetchCast } from '../../services/movies-service';

import s from './CastView.module.scss';

function CastView({ movieId }) {
  const [cast, setCast] = useState(null);

  useEffect(() => {
    fetchCast(movieId).then(({ cast }) => setCast(cast));
  }, [movieId]);

  return (
    <div className={s.CastView}>
      <ul className={s.list}>
        {cast &&
          cast.map(castMember => {
            const { id, name, profile_path, character } = castMember;
            return (
              <li key={id} className={s.listElement}>
                {profile_path ? (
                  <img
                    className={s.photo}
                    src={`https://themoviedb.org/t/p/w1280${profile_path}`}
                    alt={name}
                    width="100"
                  />
                ) : (
                  <div className={s.noPhoto}>Sorry there is no photo</div>
                )}
                <p className={s.name}>{name}</p>
                <p>Character: {character}</p>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default CastView;
