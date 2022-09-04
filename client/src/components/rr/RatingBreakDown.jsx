import React from 'react';
import PropTypes from 'prop-types';
import StarRating from './StarRating';

function PercentWidget({
  ratingFilter, stars, count, percent, toggleFilter,
}) {
  return (
    <div
      className={ratingFilter.includes(stars) ? 'rating-filter selected' : 'rating-filter'}
      onClick={() => toggleFilter(stars)}
    >
      {stars}
      stars
      <div className="rating-bar">
        <div className="inner-bar" style={{ width: `${percent.toFixed(2)}%` }} />
      </div>
      {`(${count})`}
    </div>
  );
}

PercentWidget.propTypes = {
  ratingFilter: PropTypes.arrayOf(
    PropTypes.number,
  ).isRequired,
  stars: PropTypes.number.isRequired,
  percent: PropTypes.number.isRequired,
  count: PropTypes.string.isRequired,
  toggleFilter: PropTypes.func.isRequired,
};

function RatingBreakDown({
  meta, reviews, average, total, ratingFilter, toggleFilter,
}) {
  let approval;
  if (meta.recommended) {
    const upvotes = Number(meta.recommended.true || 0) * 100;
    const allvotes = (Number(meta.recommended.true || 0) + Number(meta.recommended.false || 0));
    approval = Math.round(upvotes / allvotes);
  }
  const keys = [5, 4, 3, 2, 1];
  if (reviews.length) {
    return (
      <div className="rating-breakdown">
        <h2>Rating Breakdown</h2>
        <h1>
          {average.toFixed(1)}
          <sup>
            <StarRating rating={average} />
          </sup>
        </h1>
        <p>
          {`${approval}% of reviews recommended this product`}
        </p>
        {meta.ratings ? keys.map((i) => (
          <PercentWidget
            stars={i}
            key={i}
            percent={Math.round(Number(meta.ratings[i] || 0) * 100) / total}
            count={meta.ratings[i]}
            toggleFilter={toggleFilter}
            ratingFilter={ratingFilter}
          />
        )) : ''}
        {ratingFilter.length ? (
          <p>
            Filtering reviews for these ratings:
            {ratingFilter.map((star) => `${star} Stars`).join(', ')}
          </p>
        ) : ''}
      </div>
    );
  }
  return <div className="rating-breakdown"><p>No reviews yet</p></div>;
}

RatingBreakDown.propTypes = {
  meta: PropTypes.shape(
    {
      product_id: PropTypes.string,
      ratings: PropTypes.shape(
        {
          1: PropTypes.string,
          2: PropTypes.string,
          3: PropTypes.string,
          4: PropTypes.string,
          5: PropTypes.string,
        },
      ),
      recommended: PropTypes.shape(
        {
          true: PropTypes.string,
          false: PropTypes.string,
        },
      ),
      characteristics: PropTypes.shape(
        {
          Fit: PropTypes.shape(
            {
              id: PropTypes.number,
              value: PropTypes.string,
            },
          ),
          Width: PropTypes.shape(
            {
              id: PropTypes.number,
              value: PropTypes.string,
            },
          ),
          Comfort: PropTypes.shape(
            {
              id: PropTypes.number,
              value: PropTypes.string,
            },
          ),
          Quality: PropTypes.shape(
            {
              id: PropTypes.number,
              value: PropTypes.string,
            },
          ),
          Length: PropTypes.shape(
            {
              id: PropTypes.number,
              value: PropTypes.string,
            },
          ),
          Size: PropTypes.shape(
            {
              id: PropTypes.number,
              value: PropTypes.string,
            },
          ),
        },
      ),
    },
  ).isRequired,
  reviews: PropTypes.arrayOf(
    PropTypes.shape(
      {
        review_id: PropTypes.number,
        rating: PropTypes.number,
        summary: PropTypes.string,
        recommend: PropTypes.bool,
        body: PropTypes.string,
        date: PropTypes.string,
        reviewer_name: PropTypes.string,
        helpfulness: PropTypes.number,
        photos: PropTypes.arrayOf(
          PropTypes.shape(
            {
              id: PropTypes.number,
              url: PropTypes.string,
            },
          ),
        ),
      },
    ),
  ).isRequired,
  total: PropTypes.number.isRequired,
  ratingFilter: PropTypes.arrayOf(
    PropTypes.number,
  ).isRequired,
  toggleFilter: PropTypes.func.isRequired,
  average: PropTypes.number.isRequired,
};

export default RatingBreakDown;
