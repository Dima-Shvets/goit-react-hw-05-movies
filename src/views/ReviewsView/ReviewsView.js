import { useState, useEffect } from 'react';

import { fetchReviews } from '../../services/movies-service';

import s from './ReviewView.module.scss';

function ReviewsView({ movieId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews(movieId).then(reviews => setReviews(reviews.results));
  }, [movieId]);

  return (
    <div className={s.ReviewsView}>
      <ul>
        {reviews.length !== 0 ? (
          reviews.map(review => {
            const { id, author, content } = review;
            return (
              <li className={s.item} key={id}>
                <h4 className={s.name}>Author: {author}</h4>
                <p className={s.content}>{content}</p>
              </li>
            );
          })
        ) : (
          <p>We don't have any reviews for this movie</p>
        )}
      </ul>
    </div>
  );
}

export default ReviewsView;
