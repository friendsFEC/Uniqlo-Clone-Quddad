/* eslint-disable */

import React from 'react';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';

const Stars = ({index, currentRating, relatedAverageRatings, currentInfo}) => {
  let totalStars = 5;
  let rating = relatedAverageRatings[index] || currentRating


  return (
    <div className = "rc-star-wrapper">
      {[... new Array(totalStars)].map((arr, i) => {
        let activeStars = rating;
        let showEmptyStar = activeStars < i + 1;
        let isPartialRating = activeStars % 1 !== 0;
        let isRatingIsIndex = Math.ceil(activeStars) === i;
        let showPrecision = isPartialRating && isRatingIsIndex;
        return (
          <div className = "rc-star" key = {i}>
            <div style = {{width: showPrecision ? `${(activeStars % 1) * 100}%` : "0%", overflow: "hidden", position: "absolute"}} className = "rc-star-active">
              <AiFillStar />
            </div>
            <div>
              {showEmptyStar ? <AiOutlineStar /> : <AiFillStar />}
            </div>
          </div>
        )
      })}
    </div>
  )

}

export default Stars;