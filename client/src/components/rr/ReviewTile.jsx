import React from 'react';
import PropTypes from 'prop-types';
import StarRating from './StarRating';
import {formatDate} from './utility';

export default function ReviewTile(props) {
  let {
    review, search, searchFilter, ratingFilter, helpfulReviews,
    setHelpful, reportReview, helpful,
  } = props;
  let hidden = false
  if (search.length > 2) {
    if (!searchFilter(review)) {
      hidden = true;
    }
  }
  if (ratingFilter.length) {
    if (!ratingFilter.includes(review.rating)) {
      hidden = true;
    }
  }
  return (
    <div className={ hidden ? "review-tile hidden" : "review-tile" }>
      <div>
        <span className="star-rating"><StarRating rating={review.rating} /></span>
        <div className="reviewer-and-date">
          {/* there is no way to verify if user_id / email  is associated with a purchase */}
           {review.reviewer_name}, {formatDate(review.date)}
        </div>
      </div>
      <p className="bold">{review.summary}</p>
      {
        (review.body.length <= 250) ?
          <p>{review.body}</p>
          :
            <p>
              {review.body.slice(0, 250)}...
              <br /><a
                style={{color: 'blue'}}
                onClick={(ev) => {
                ev.preventDefault();
                let p = ev.target.parentElement;
                p.removeChild(p.children[0]);
                p.textContent += review.body.slice(250);
              }}>Show More</a>
            </p>
      }
      {review.photos.map((obj, i) =>
        <img
          className='review-thumbnail'
          key={i}
          src={obj.url}
          onClick={({target}) => {
            target.classList.toggle('hidden');
            target.classList.toggle('image-modal');
            target.classList.toggle('review-thumbnail');
            setTimeout(() => target.classList.toggle('hidden'), 200);
          }}
        />)
      }
      { review.recommend ?
          <p>
            <img className="checkmark" src='./img/rr/checkmark.svg' />
            I recommend this product
          </p> : '' }
      {review.reponse ? <div className="review-response"><p><strong>Response</strong></p><p>{review.response}</p></div> : ''}
      { helpfulReviews.includes(review.review_id) ? '' :
        <p>
          Was this review helpful?
          <button
            onClick={() => {
              helpful(review.review_id)
              .then(() => setHelpful([...helpfulReviews, review.review_id]));
            }}
          >
            Yes
          </button> ({review.helpfulness})
          {/* BRD mentions a 'No' button, but the API doesn't retain or allow posts to this value, deferring to mockup */}
          <span
            className="report"
            onClick={({target}) => {
              reportReview(review.review_id);
              target.parentElement.parentElement.classList.toggle('hidden');
            }}
          >
            Report
          </span>
        </p>
      }
    </div>
  )
};
