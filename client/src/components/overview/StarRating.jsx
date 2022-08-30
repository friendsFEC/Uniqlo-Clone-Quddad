import React from 'react';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';

const StarRating = ({ rating }) => {



  return (
    <div className='ov-StarWrapper'>
      {[...Array(5)].map((star, idx) => {
          let activeStars = Math.round(rating/0.25)*0.25 - 1;
          let emptyStar = activeStars === -1 || activeStars < idx;
          let isPartialRating = activeStars % 1 !== 0;
          let isRatingIsIdx = Math.ceil(activeStars) === idx;
          let showPrecision = isPartialRating && isRatingIsIdx;
        return (
          <div className='ov-star' key={idx}>
            <div style= {{
              width: showPrecision ? `${(activeStars % 1) * 100}%` : "0%",
              overflow: "hidden",
              position: "absolute",
            }} className='ov-star--active'>
              <AiFillStar/>
            </div>
            <div className='.ov-star--partial'>
              {emptyStar ? <AiOutlineStar/> : <AiFillStar/>}
            </div>
          </div>

        )
      })}
    </div>
  )
}








export default StarRating;