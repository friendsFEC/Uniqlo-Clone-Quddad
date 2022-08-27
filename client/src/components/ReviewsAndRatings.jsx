import React, {useState, useEffect} from 'react';
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

  /* rendering */
  useEffect(() => {
    getReviews(productID).then(data => {
      setReviews(data.results);
      setAverage(calculateAverage(data));
    });
  }, [productID, average]);

  /* components */
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
  let ReviewTile = (props) => (
    <div className="review-tile">
      <p>
        Rating: {props.review.rating} by {props.review.reviewer_name}  at {props.review.date}
      </p>
      <p>{props.review.summary}</p>
      <p>{props.review.body}</p>
      <p></p>
    </div>
  );
  let SortOptions = (props) => (
    <div className="sort-options">
      <p>Sort Options <input type="text" placeholder="" /></p>
      
    </div>
  );
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
        <SortOptions />
        <RatingBreakDown />
        <ProductBreakDown />
        <ReviewList />
      </div>
    </div>
  )
}

let WriteReview = (props) => (
  <p>Write Review</p>
);

export default ReviewsAndRatings;
