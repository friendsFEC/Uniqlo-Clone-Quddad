import React from 'react';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';

export default function StarRating({ rating }) {
  const scrollToReviews = () => {
    document.getElementById('rr').scrollIntoView();
  };

  return (
    <div className="ov-StarWrapper">
      {[...Array(5)].map((star, idx) => {
        const activeStars = Math.round(rating/0.25)*0.25 - 1;
        const emptyStar = activeStars === -1 || activeStars < idx;
        const isPartialRating = activeStars % 1 !== 0;
        const isRatingIsIdx = Math.ceil(activeStars) === idx;
        const showPrecision = isPartialRating && isRatingIsIdx;
        return (
          <div className="ov-star" key={idx}>
            <div
              style={{
                width: showPrecision ? `${(activeStars % 1) * 100}%` : '0%',
                overflow: 'hidden',
                position: 'absolute',
              }}
              className="ov-star--active"
            >
              <AiFillStar />
            </div>
            <div className="ov-star--partial">
              {emptyStar ? <AiOutlineStar /> : <AiFillStar />}
            </div>
          </div>
        );
      })}
      <span className="ov-title--reviews"onClick={scrollToReviews}>Read All Reviews</span>
    </div>
  );
}
