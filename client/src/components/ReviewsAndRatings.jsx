import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import config from '../../../config.js';

const serverURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/rfp/reviews';

const calculateAverage = (data) => {
  return data.results.reduce((memo, rev) => memo + rev.rating, 0) / data.count;
};


let ReviewsAndRatings = (props) => {
  /* hooks */
  const [productID, setProductID] = useState(props.product_id || 65631);
  const [reviews, setReviews] = useState([]);
  const [average, setAverage] = useState(0);
  const [sort, setSort] = useState('relevant');
  const [more, setMore] = useState(true);
  const [search, setSearch] = useState('');
  const count = 2;

  /* utility functions */
  const getReviews = (productID, page=1, count=2, sort='relevant') => (
    // args: integer for product ID
    // returns: an array of objects
    axios.get(serverURL, {
      headers: {
        Authorization: config.API_KEY,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      params: {
        product_id: productID,
        page: page,
        count: count,
        sort: sort
      }
    })
    .then(response => response.data)
    .then(data => {
      if (data.results.length === 0) {
        setMore(false);
      }
      return data
    }) // this is what gets 'returned'
    .catch(err => console.log('Error getting review data:', err))
  )
  const searchFilter = (review) => {
    let keys = ['summary', 'body', 'reviewer_name']
    let re = RegExp(search.toLowerCase());
    return keys.reduce((memo, k) => {
      return re.test(review[k].toLowerCase()) ? true : memo;
    }, false);
  }

  /* rendering */
  useEffect(() => {
    getReviews(productID).then(data => {
      setReviews(data.results);
      setAverage(calculateAverage(data));
    });
  }, []); // effect runs once

  /* sub components */
  let ReviewList = (props) => (
    <div className="review-list">
      {reviews.map((review,i) => <ReviewTile key={i} review={review}/>)}
      { more ? (
        <button onClick={() => {
          getReviews(productID, (reviews.length / count) + 1, count, sort)
            .then(data => setReviews(reviews.concat(data.results)));
        }}>More Reviews</button>
      ) : '' }
      <button>Add a review</button>
    </div>
  );
  let ReviewTile = (props) => {
    return (
      <div className={search.length > 2 ? (searchFilter(props.review) ? "review-tile" : "review-tile hidden") : "review-tile"}>
        <p>
          Rating: {props.review.rating} by {props.review.reviewer_name}  at {props.review.date}
        </p>
        <p>{props.review.summary}</p>
        <p>{props.review.body}</p>
        <p></p>
      </div>
    )
  };
  let RatingBreakDown = (props) => (
    <div className="rating-breakdown">
      <p>Rating Breakdown</p>
    </div>
  );
  let ProductBreakDown = (props) => (
    <div className="product-breakdown">
      <p>ProductBreakdown</p>
    </div>
  );

  return (
    <div className="rr">
      <h1>Ratings & Reviews Section</h1>
      <p>Product ID: {productID}</p>
      <div className="review-grid">
        <SortOptions search={search} setSearch={setSearch}/>
        <RatingBreakDown />
        <ProductBreakDown />
        <ReviewList search={search}/>
      </div>
    </div>
  )
}
let SortOptions = (props) => (
<div className="sort-options">
  <div>
    Sort Options <select>
      <option>related</option>
      <option>helpful</option>
      <option>newest</option>
    </select>
    Search Reviews:<input type="text" value={props.search} onChange={({target}) => {
      props.setSearch(target.value);
    }}/>
  </div>
</div>
);

let WriteReview = (props) => (
  <p>Write Review</p>
);

export default ReviewsAndRatings;
