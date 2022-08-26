import React, {useState, useEffect} from 'react';
import axios from 'axios';
import config from '../../../config.js';

const serverURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/rfp/reviews';

const calculateAverage = (data) => {
  return data.results.reduce((memo, rev) => memo + rev.rating, 0) / data.count;
}

const getReviews = (productID) => (
  // args: integer for product ID
  // returns: an array of objects
  axios.get(serverURL, {
    headers: {
      Authorization: config.API_KEY,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    params: {
      product_id: productID
    }
  })
  .then(response => response.data)
  .then(data => data)
  .catch(err => console.log('Error getting review data:', err))
)

let ReviewsAndRatings = (props) => {
  const [productID, setProductID] = useState(props.product_id || 65631);
  const [reviews, setReviews] = useState([]);
  const [average, setAverage] = useState(0);
  useEffect(() => {
    console.log('useEffect running');
    getReviews(productID).then(data => {
      setReviews(data.results);
      setAverage(calculateAverage(data));
    });
  }, [productID, average]);
  let ReviewList = (props) => (
    <div>
      {reviews.map((review,i) => <ReviewTile key={i} review={review}/>)}
    </div>
  )
  let ReviewTile = (props) => (
    <div>
      <p>
        Rating: {props.review.rating} by {props.review.reviewer_name}  at {props.review.date}
      </p>
      <p>{props.review.summary}</p>
      <p>{props.review.body}</p>
      <p></p>
    </div>
  )
  let SortOptions = (props) => (
    <p>Sort Options</p>
  )
  let RatingBreakDown = (props) => (
    <p>Rating Breakdown</p>
  )
  let ProductBreakDown = (props) => (
    <p>ProductBreakdown</p>
  )
  return (
    <div className="rr">
      <h1>Ratings & Reviews Section</h1>
      <p>Product ID: {productID}</p>
      <SortOptions />
      <RatingBreakDown />
      <ProductBreakDown />
      <ReviewList />
    </div>
  )
}

let WriteReview = (props) => (
  <p>Write Review</p>
)

export default ReviewsAndRatings;
