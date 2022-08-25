import React from 'react'
import Joey from './Joey.jsx';
import RelatedAndComparison from './RelatedAndComparison.jsx';
import Oveview from './Overview.jsx';
import ReviewsAndRatings from './ReviewsAndRatings.jsx';


let App = (props) => (
  <div>
    <Joey />
    <RelatedAndComparison />
    <Overview />
    <ReviewsAndRatings />
  </div>
)

export default App;

