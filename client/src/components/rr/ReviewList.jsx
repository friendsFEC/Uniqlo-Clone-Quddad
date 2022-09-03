import React from 'react';
import PropTypes from 'prop-types';
import ReviewTile from './ReviewTile';
import { debounce } from './utility';

export default function ReviewList ({
    productID, reviews, total, more, count, sort, getReviews, setReviews,
    search, searchFilter, ratingFilter, helpful, setHelpful,
    helpfulReviews, reportReview,
  }) {
  /* initial rendering and changes to product id */
  // infinite scroll, not working correctly
  let retrieveReviews = () => {
    if (more) {
      getReviews(productID, (reviews.length / count) + 1, count, sort)
        .then(data => setReviews(reviews.concat(data.results)))
        .catch(err => logError('Error retrieving reviews from infinite scroll', err))
    }
  }
  retrieveReviews = debounce(retrieveReviews, 500);

  return (
    <div
      className="review-list"
      onScroll={({target}) => {
        let btn = document.getElementById('rr-write-review-btn');
        btn.classList.add('float');
        //btn.style.top = window.innerHeight - target.offsetHeight;
        btn.style.top = window.innerHeight - btn.offsetHeight * 2;
        btn.style.left = target.offsetLeft;
        btn.style.width = target.offsetWidth;
        if (Math.abs((target.scrollTop + target.clientHeight) - target.scrollHeight) < 10) {
          retrieveReviews();
          btn.classList.remove('float');
          btn.style.width = '';
        } else if (target.scrollTop === 0) {
          btn.classList.remove('float');
        }
      }}
    >
      {reviews.length ? reviews.map((review,i) => 
        <ReviewTile
          key={i}
          review={review}
          search={search}
          searchFilter={searchFilter}
          ratingFilter={ratingFilter}
          helpful={helpful}
          setHelpful={setHelpful}
          helpfulReviews={helpfulReviews}
          total={total}
          reportReview={reportReview}
        />)
       : <p>There are no reviews to display</p> }
      {reviews.length ? <p id="rr-no-reviews-showing">No reviews to show with selected filters! Try including more filters or load more reviews to see some results.</p> : ''}
      { more ? (
        <button onClick={() => {
          getReviews(productID, (reviews.length / count) + 1, count, sort)
            .then(data => setReviews(reviews.concat(data.results)));
        }}>More Reviews</button> // add infinite scroll later on
      ) : '' }
      <div id='rr-write-review-btn'><button  onClick={() => document.getElementsByClassName('write-review')[0].classList.toggle('hidden')}>Add a review</button></div>
    </div>
  )
};
