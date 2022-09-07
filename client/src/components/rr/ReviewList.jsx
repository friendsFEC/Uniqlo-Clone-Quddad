import React from 'react';
import PropTypes from 'prop-types';
import ReviewTile from './ReviewTile';
import { debounce, logError } from './utility';

export default function ReviewList({
  productID, reviews, total, more, count, sort, getReviews, setReviews,
  search, searchFilter, ratingFilter, helpful, setHelpful,
  helpfulReviews, reportReview, setMore
}) {
  /* initial rendering and changes to product id */
  // infinite scroll, not working correctly
  let retrieveReviews = () => {
    if (more) {
      getReviews(productID, (reviews.length / count) + 1, count, sort)
        .then((data) => {
          if (data.results.length === 0) {
            setMore(false);
          } else {
            setMore(true);
          }
          return data;
        })
        .then((data) => setReviews(reviews.concat(data.results)))
        .catch((err) => logError('Error retrieving reviews from infinite scroll', err));
    }
  };
  retrieveReviews = debounce(retrieveReviews, 500);

  return (
    <div
      className="review-list"
      onScroll={({ target }) => {
        const btn = document.getElementById('rr-write-review-btn');
        if (btn) {
          const scrolledToBottom = Math.abs((target.scrollTop + target.clientHeight) - target.scrollHeight) < (btn.offsetHeight * 1.5);
          btn.classList.add('float');
          // btnDiv.style.top = /*window.innerHeight*/document.getElementsByClassName('review-list')[0].offsetHeight - btnDiv.offsetHeight;
          let listDiv = document.getElementsByClassName('review-list')[0];
          btn.style.top = listDiv.offsetTop + listDiv.offsetHeight - window.scrollY - btn.offsetHeight;
          btn.style.left = target.offsetLeft;
          btn.style.width = target.offsetWidth;
          if (scrolledToBottom) {
            retrieveReviews();
            btn.classList.remove('float');
            btn.style.width = '';
            if (btn.previousElementSibling.tagName !== 'BUTTON') {
              btn.style.width = '100%';
            }
          }
        } else if (Math.abs(((target.scrollTop + target.clientHeight) - target.scrollHeight) < 5)) {
          retrieveReviews();
        }
      }}
    >
      { reviews.length ? reviews.map(
        (review) => (
          <ReviewTile
            key={review.review_id}
            review={review}
            search={search}
            searchFilter={searchFilter}
            ratingFilter={ratingFilter}
            helpful={helpful}
            setHelpful={setHelpful}
            helpfulReviews={helpfulReviews}
            total={total}
            reportReview={reportReview}
          />
        ),
      ) : <p>There are no reviews to display</p> }
      {reviews.length ? <p id="rr-no-reviews-showing">No reviews to show with selected filters! Try including more filters or load more reviews to see some results.</p> : ''}
      { more ? (
        <button
          type="button"
          onClick={() => getReviews(productID, (reviews.length / count) + 1, count, sort)
            .then((data) => setReviews(reviews.concat(data.results)))}
        >
          More Reviews
        </button> // add infinite scroll later on
      ) : null }
        <button
          id="rr-write-review-btn"
          type="button"
          onClick={() => document.getElementsByClassName('write-review')[0].classList.toggle('hidden')}
        >
          Add a Review
        </button>
    </div>
  );
}

ReviewList.propTypes = {
  productID: PropTypes.number.isRequired,
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
  more: PropTypes.bool.isRequired,
  count: PropTypes.number.isRequired,
  sort: PropTypes.string.isRequired,
  getReviews: PropTypes.func.isRequired,
  setReviews: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  searchFilter: PropTypes.func.isRequired,
  ratingFilter: PropTypes.node.isRequired,
  helpful: PropTypes.func.isRequired,
  setHelpful: PropTypes.func.isRequired,
  helpfulReviews: PropTypes.node.isRequired,
  reportReview: PropTypes.func.isRequired,
  setMore: PropTypes.func.isRequired,
};
