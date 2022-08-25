import React from 'react'
import Joey from './Joey.jsx';
import Chandler from './Chandler.jsx';
import Oveview from './Overview.jsx';
import ReviewsAndRatings from './ReviewsAndRatings.jsx';

let App = (props) => (
  <div>
    <Joey />
    <Chandler />
    <Overview />
    <ReviewsAndRatings />
  </div>
)

export default App;

