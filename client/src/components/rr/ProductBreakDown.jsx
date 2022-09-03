import React from 'react';
import PropTypes from 'prop-types';

export default function ProductBreakDown(props) {
  const keys = props.meta ? (props.meta.characteristics ? Object.keys(props.meta.characteristics) : []) : [];
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
