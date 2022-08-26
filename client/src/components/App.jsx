import React from 'react'
import QuestionsAndAnswers from './QuestionsAndAnswers.jsx';
import RelatedAndComparison from './RelatedAndComparison.jsx';
import Overview from './Overview.jsx';
import ReviewsAndRatings from './ReviewsAndRatings.jsx';


let App = (props) => (
  <div>
    <RelatedAndComparison />
    <Overview />
    <QuestionsAndAnswers />
    <ReviewsAndRatings />
  </div>
)

export default App;

