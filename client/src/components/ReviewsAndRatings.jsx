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

function ReviewsAndRatings(props) {
  /* hooks */
  const { productID } = props;
  const [reviews, setReviews] = useState([]);
  const [meta, setMeta] = useState({});
  const [total, setTotal] = useState(0);
  function reducer(state, action) {
    switch (action.type) {
      case 'setAverage':
        return { average: calculateAverage(meta, total) };
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

  /* render once product id changes */
  useEffect(() => {
    getReviewsMeta(productID)
      .then((data) => setMeta(data))
      .then(() => {
        getReviews(productID, 1, 5).then((data) => setReviews(data.results));
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
        targetWidget.classList.contains('hidden') ? targetWidget.classList.toggle('hidden') : null;
      } else {
        targetWidget.classList.contains('hidden') ? null : targetWidget.classList.toggle('hidden');
      }
    }
  }, [ratingFilter, reviews, search]);

  /* render when sort changes */
  useEffect(() => {
    getReviews(productID, 1, reviews.length || 2, sort).then(data => {
      if (data.results.length === 0) {
        setMore(false);
      } else {
        setMore(true);
      }
      setReviews(data.results);
    });
  }, [sort]);


  return (
    <div className="rr" id="rr">
      <h1>Ratings & Reviews Section</h1>
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
        <WriteReview characteristics={meta.characteristics}/>
      </div>
    </div>
  )
};

/* sub components */




let ProductBreakDown = (props) => {
  let keys = props.meta ? (props.meta.characteristics ? Object.keys(props.meta.characteristics) : []) : [];
  if (props.reviews.length) {
    return (
      <div className="product-breakdown">
        <h2>Product Breakdown</h2>
        {keys.map((char,i) =>
          <CharacteristicsWidget key={i} name={char} />
        )}
      </div>
    )
  } else {
    return <div className='product-breakdown'><p>No reviews yet</p></div>
  }
};
let CharacteristicsWidget = (props) => {
  let text = {
    Fit: {left: 'Too tight', middle: 'Perfect', right: 'Too loose'},
    Comfort: {left: 'Uncomfortable', middle: 'Average', right: 'Comfortable'},
    Length: {left: 'Too short', middle: 'Perfect', right: 'Too long'},
    Quality: {left: 'Poor', middle: 'Average', right: 'Great'},
    Size: {left: 'Too small', middle: 'Just right', right: 'Too large'},
    Width: {left: 'Too thin', middle: 'Just right', right: 'Too wide'},
  }
  return (
    <div className='characteristics'>
      {props.name}
      <div className='characteristics-bar'>
        <img className='characteristics-arrow' src='./img/rr/arrow.svg' />
      </div>
      <div className='characteristics-description'>
        <p className='rr-left'>{text[props.name].left}</p>
        <p className='rr-middle'>{text[props.name].middle}</p>
        <p className='rr-right'>{text[props.name].right}</p>
      </div>
    </div>
  )
}


let WriteReview = (props) => {
  let characteristics = {
    Size: {
      1: 'A size too small', 
      2: '1/2 a size too small',
      3: 'Perfect',
      4: '1/2 a size too big',
      5: 'A size too wide'
    },
    Width: {
      1: 'Too narrow',
      2: 'Slightly narrow',
      3: 'Perfect',
      4: 'Slightly wide',
      5: 'Too wide'
    },
    Comfort: {
      1: 'Uncomfortable',
      2: 'Slightly uncomfortable',
      3: 'Ok',
      4: 'Comfortable',
      5: 'Perfect'
    },
    Quality: {
      1: 'Poor',
      2: 'Below Average',
      3: 'What I expected',
      4: 'Pretty great',
      5: 'Perfect'
    },
    Length: {
      1: 'Runs short',
      2: 'Below average',
      3: 'What I expected',
      4: 'Runs slightly long',
      5: 'Runs long'
    },
    Fit: {
      1: 'Runs tight',
      2: 'Runs slightly tight',
      3: 'Perfect',
      4: 'Runs slightly long',
      5: 'Runs long'
    }
  }
  let keys = Object.keys(characteristics);
  let parseForm = () => {
    let review = {}
    let reviewItems = ['rating', 'recommend', 'summary', 'body', 'photos', 'email', 'reviewer_name'];
    review.date = new Date();
    review.characteristics = {}; // [...keys]
    reviewItems.map(key => review[key] = document.getElementsByName(`rr-review-${key}`)[0].value);
    keys.forEach((key) => {
      const target = document.getElementsByName(`rr-review-${key}`)[0];
      review.characteristics[key] = target ? target.value : '';
    });
    console.log(review);
  }
  return (
    <div className="hidden write-review">
      <div className='close'
      style={{color: 'blue', textDecoration: 'underline'}}
      onClick={() => document.getElementsByClassName('write-review')[0].classList.toggle('hidden')}
    >
      Cancel Review (close)
      </div>
      <h1>Write Review</h1>
      <h2>Overall rating (mandatory)</h2>
      <p name='rr-review-rating' value='5'>[interactive stars with highlight-on-hover will go here] 1 - poor, 2 - fair, 3 - average, 4 - good, 5 - great </p>
      <h2>Do you recommend this product? (mandatory)</h2>
      <p><input type="radio" defaultChecked name="rr-review-recommend" value="true" /> Yes</p>
      <p><input type="radio" name="rr-review-recommend" value="false" /> No</p>
      <h2>Characteristics (mandatory)</h2>
      <table>
        <tbody>
        {
          keys.map((k, i) => {
            return props.characteristics && props.characteristics.hasOwnProperty(k) ?
             (
            <tr key={i}>
              <td><strong>{k}</strong></td>
              {[1, 2, 3, 4, 5].map(field => 
                <td key={field}>{characteristics[k][field]} <input type='radio' name={`rr-review-${k}`} value={field} /></td>
              )}
            </tr>
            ) : null
          })
        }
        </tbody>
      </table>
      <h2>Review Summary (mandatory)</h2>
      <p>[limit to 60 characters]</p>
      <input type="text" name="rr-review-summary" placeholder="Example: Best purchase ever!" />
      <h2>Review body (mandatory)</h2>
      <p>[minimum 50, max 1000 characters]</p>
      <textarea rows="24" cols="80" name="rr-review-body" ></textarea>
      <h2>What is your nickname (mandatory)</h2>
      <input type="text" name='rr-review-reviewer_name' placeholder='Example: jackson11!' />
      <h2>Upload your photos</h2>
      <p name='rr-review-photos' value={null}>[this is gonna be tricky]</p>
      <h2>Your email (mandatory)</h2>
      <p>[up to 60 characters]</p>
      <input type="email" name="rr-review-email" placeholder="Example: jackson11@email.com" />
      <p>For authentication reasonse, you will not be emailed.</p>
      <button onClick={parseForm}>Submit Review</button>
      <p>[check that for blank mandatory fields, review body [50, 1000] in length, proper email format, and valid images selected]</p>
    </div>
  )
};

ReviewsAndRatings.propTypes = {
  productID: PropTypes.number,
}

export default ReviewsAndRatings;
