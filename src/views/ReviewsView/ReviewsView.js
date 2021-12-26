import { useState, useEffect } from 'react';

import { fetchReviews } from '../../services/movies-service';

function ReviewsView({ movieId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews(movieId).then(reviews => setReviews(reviews.results));
  }, [movieId]);

  return (
    <ul>
      {reviews.length !== 0 ? (
        reviews.map(review => {
          const { id, author, content } = review;
          return (
            <li key={id}>
              Author: {author}
              <p>{content}</p>
            </li>
          );
        })
      ) : (
        <p>We don't have any reviews for this movie</p>
      )}
    </ul>
  );
}

export default ReviewsView;
