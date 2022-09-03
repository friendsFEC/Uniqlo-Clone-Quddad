import React from 'react';
import PropTypes from 'prop-types';
import StarRating from './StarRating';

const PercentWidget = (props) => (
  <div
    className={
      props.ratingFilter.indexOf(props.stars) > -1 ?
        'rating-filter selected' : 'rating-filter'
    }
    onClick={()=>
      props.toggleFilter(props.stars)
    }>
    {props.stars} stars <div className='rating-bar'>
      <div className='inner-bar' style={{width: `${props.percent.toFixed(2)}%`}}></div>
    </div> ({props.count})
  </div>
);

let RatingBreakDown = (props) => {
  //let keys = props.meta ? (props.meta.ratings ? Object.keys(props.meta.ratings).reverse() : []) : [];
  let approval;
  if (props.meta.recommended) {
    approval = Math.round(Number(props.meta.recommended.true || 0) * 100 / (Number(props.meta.recommended.true || 0) + Number(props.meta.recommended.false || 0)));
  }
  let keys = [5, 4, 3, 2, 1];
  //console.log(props.meta);
  if (props.reviews.length) {
    return (
      <div className="rating-breakdown">
        <h2>Rating Breakdown</h2>
        <h1>{props.average.toFixed(1)}<sup><StarRating rating={props.average} /></sup></h1>
        <p>{approval}% of reviews recommended this product</p>
        {props.meta.ratings ? keys.map(i =>
          <PercentWidget
            stars={i}
            key={i}
            percent={parseInt(props.meta.ratings[i] || 0) / props.total * 100}
            count={props.meta.ratings[i]}
            toggleFilter={props.toggleFilter}
            ratingFilter={props.ratingFilter}
          />
        ) : ''}
        {props.ratingFilter.length ? <p>Filtering reviews for these ratings: {props.ratingFilter.map(star => `${star} Stars`).join(', ')}</p> : ''}
      </div>
    )
  } else {
    return <div className='rating-breakdown'><p>No reviews yet</p></div>
  }
};

export default RatingBreakDown;
