import React, { useState, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';

import {
  calculateAverage,
  calculateTotal,
  positionArrowWidgets,
  setAverage,
} from './rr/utility';

import {
  getReviewsMeta,
  getReviews,
  reportReview,
  markHelpful,
} from './rr/api';

import ReviewList from './rr/ReviewList';
import RatingBreakDown from './rr/RatingBreakDown';
import SortOptions from './rr/SortOptions';
import ProductBreakDown from './rr/ProductBreakDown';
import WriteReview from './rr/WriteReview';

function ReviewsAndRatings(props) {
  /* hooks */
  const { productID } = props;
  const [reviews, setReviews] = useState([]);
  const [meta, setMeta] = useState({});
  const [total, setTotal] = useState(0);
  function reducer(state, action) {
    switch (action.type) {
      case 'setAverage':
        return { ...state, average: calculateAverage(meta, total) };
      default:
        return state;
    }
  }
  const initialState = { average: 0 };
  const [state, dispatch] = useReducer(reducer, initialState);
  const [sort, setSort] = useState('relevant');
  const [more, setMore] = useState(true);
  const [search, setSearch] = useState('');
  const [ratingFilter, setRatingFilter] = useState([]);
  const [helpfulReviews, setHelpfulReviews] = useState([]);
  const count = 2;

  const searchFilter = (review) => {
    const keys = ['summary', 'body', 'reviewer_name'];
    const re = RegExp(search.toLowerCase());
    return keys.reduce(
      (memo, k) => (re.test(review[k].toLowerCase()) ? true : memo),
      false,
    );
  };

  const toggleFilter = (filter) => {
    const index = ratingFilter.indexOf(filter);
    if (index > -1) {
      const filtered = ratingFilter.filter((rate) => rate !== filter);
      setRatingFilter(filtered);
    } else {
      setRatingFilter([...ratingFilter, filter]);
    }
  };

  window.addEventListener('resize', positionArrowWidgets);
  window.addEventListener('scroll', () => {
    const btnDiv = document.getElementById('rr-write-review-btn');
    const revList = document.getElementsByClassName('review-list')[0];

    if (btn) {
      if ((revList.offsetTop - revList.offsetHeight) < window.scrollY) {
        btnDiv.classList.remove('float');
      }
    }
  });

  /* render once product id changes */
  useEffect(() => {
    getReviewsMeta(productID)
      .then((data) => setMeta(data))
      .then(() => {
        getReviews(productID, 1, 6).then((data) => setReviews(data.results));
      });
  }, [productID]); // effect runs on product id change

  useEffect(() => {
    /* non responsive rendering (doesn't fix if page resizes) */
    setTotal(calculateTotal(meta));
    positionArrowWidgets(meta);
  }, [meta]);
  useEffect(() => dispatch(setAverage), [total]);

  /* render when reviews change */
  useEffect(() => {
    const loadedReviews = Array.from(document.getElementsByClassName('review-tile'));
    const targetWidget = document.getElementById('rr-no-reviews-showing');
    const hiddenReviews = loadedReviews.filter((rev) => rev.classList.contains('hidden'));
    if (targetWidget) {
      if (hiddenReviews.length === reviews.length) {
        if (targetWidget.classList.contains('hidden')) {
          targetWidget.classList.toggle('hidden');
        }
      } else if (!targetWidget.classList.contains('hidden')) {
        targetWidget.classList.toggle('hidden');
      }
    }
  }, [ratingFilter, reviews, search]);

  /* render when sort changes */
  useEffect(() => {
    getReviews(productID, 1, reviews.length || 2, sort).then((data) => {
      setReviews(data.results);
    });
  }, [sort, productID]);

  return (
    <div className="rr" id="rr">
      <h1>Ratings & Reviews</h1>
      <div className="review-grid">
        <SortOptions
          setSort={setSort}
          search={search}
          setSearch={setSearch}
          total={total}
        />
        <RatingBreakDown
          meta={meta}
          average={state.average}
          toggleFilter={toggleFilter}
          ratingFilter={ratingFilter}
          total={total}
          reviews={reviews}
        />
        <ProductBreakDown
          meta={meta}
          reviews={reviews}
        />
        <ReviewList
          more={more}
          setMore={setMore}
          search={search}
          reviews={reviews}
          searchFilter={searchFilter}
          getReviews={getReviews}
          setReviews={setReviews}
          productID={productID}
          count={count}
          sort={sort}
          ratingFilter={ratingFilter}
          helpful={markHelpful}
          setHelpful={setHelpfulReviews}
          helpfulReviews={helpfulReviews}
          total={total}
          reportReview={reportReview}
        />
        <WriteReview
          characteristics={meta.characteristics}
          productID={productID}
        />
      </div>
    </div>
  );
}

ReviewsAndRatings.propTypes = {
  productID: PropTypes.number.isRequired,
};

export default ReviewsAndRatings;
