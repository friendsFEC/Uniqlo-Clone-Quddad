import React from 'react';
import PropTypes from 'prop-types';

function StarRating({ rating }) {
  let render = (rating) => {
    let res = [];
    let i = 0;
    // fill in full stars
    for (i; i < Math.trunc(rating); i++) {
      res.push(<img key={i} className="star" src='./img/rr/star-full.svg' />);
    }
    // fill in partial star
    let partial = rating - Math.trunc(rating);
    if (partial > 0) {
      if (partial <= 0.25) {
        res.push(<img key={i} className="star" src='./img/rr/star-quarter.svg' />);
      } else if (partial <= 0.5) {
        res.push(<img key={i} className="star" src='./img/rr/star-half.svg' />);
      } else if (partial <= 0.75) {
        res.push(<img key={i} className="star" src='./img//rr/star-three-quarter.svg' />);
      } else {
        res.push(<img key={i} className="star" src='./img/rr/star-full.svg' />);
      }
      i++;
    }
    // fill in empty
    while (res.length < 5) {
      res.push(<img key={i} className="star" src='./img/rr/star-empty.svg' />);
      i++;
    }
    return res;
  }
  return <span>{render(rating)}</span>
};

StarRating.propTypes = {
  rating: PropTypes.number,
};

export default StarRating;
