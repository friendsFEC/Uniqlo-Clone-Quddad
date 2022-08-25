import React from 'react';

let ReviewsAndRatings = (props) => (
  <div className="rr">
    <h1>Ratings & Reviews Section</h1>
    {[0,1 ,2,3,4,5].map((item, i) => (
      <p key={i}>{item} lorem ipsum dolor sit amet consectitur edipiscing elit</p>
    ))}
    <div>
      <h2>Another section</h2>
      <p>more stuff down here</p>
    </div>
  </div>
)

export default ReviewsAndRatings;
