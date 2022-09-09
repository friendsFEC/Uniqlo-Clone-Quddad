/* eslint-disable */

import React from 'react';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';

const Stars = ({index, currentRating, relatedAverageRatings, currentInfo}) => {
  let totalStars = 5;
  let rating = currentRating || relatedAverageRatings[index]
  return (
    <div className = "rc-star-wrapper">
      {[... new Array(totalStars)].map((star, i) => {
        let activeStars = Math.round(rating/0.25) * 0.25 - 1;
        let showEmptyStar = activeStars < i;
        let isRatingWithPrecision = activeStars % 1 !== 0;
        let isRatingEqualToIndex = Math.ceil(activeStars) === i;
        let showRatingWithPrecision = isRatingWithPrecision && isRatingEqualToIndex;
        return (
          <div className = "rc-star" key = {i}>
            <div style = {{width: showRatingWithPrecision ? `${(activeStars % 1) * 100}%` : "0%", overflow: "hidden", position: "absolute"}} className = "rc-star-active">
            <img alt="" key={i} className="star" src="./img/rr/star-full.svg" />
            </div>
            <div>
              {showEmptyStar ? <img alt="" key={i} className="star" src="./img/rr/star-empty.svg" /> : <img alt="" key={i} className="star" src="./img/rr/star-full.svg" />}
            </div>
          </div>
        )
      })}
    </div>
  )

}

export default Stars;