import React from 'react';
import PropTypes from 'prop-types';

function StarRating({ rating }) {
  const render = (value) => {
    const res = [];
    let i = 0;
    // fill in full stars
    for (i; i < Math.trunc(value); i += 1) {
      res.push(<img alt="" key={i} className="star" src="./img/rr/star-full.svg" />);
    }
    // fill in partial star
    const partial = value - Math.trunc(value);
    if (partial > 0) {
      if (partial <= 0.25) {
        res.push(<img alt="" key={i} className="star" src="./img/rr/star-quarter.svg" />);
      } else if (partial <= 0.5) {
        res.push(<img alt="" key={i} className="star" src="./img/rr/star-half.svg" />);
      } else if (partial <= 0.75) {
        res.push(<img alt="" key={i} className="star" src="./img//rr/star-three-quarter.svg" />);
      } else {
        res.push(<img alt="" key={i} className="star" src="./img/rr/star-full.svg" />);
      }
      i += 1;
    }
    // fill in empty
    while (res.length < 5) {
      res.push(<img alt="" key={i} className="star" src="./img/rr/star-empty.svg" />);
      i += 1;
    }
    return res;
  };
  return <span>{render(rating)}</span>;
}

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
};

export default StarRating;
