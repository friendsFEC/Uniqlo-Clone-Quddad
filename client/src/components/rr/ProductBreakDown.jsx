import React from 'react';
import PropTypes from 'prop-types';

function ProductBreakDown({ meta, reviews }) {
  let keys = [];
  if (meta.characteristics) {
    keys = keys.concat(Object.keys(meta.characteristics));
  }
  if (reviews.length) {
    return (
      <div className="product-breakdown">
        <h2>Product Breakdown</h2>
        { keys.map((char) => (
          <CharacteristicsWidget
            key={`characteristic-${char}`}
            name={char}
          />
        )) }
      </div>
    );
  }
  return <div className="product-breakdown"><p>No reviews yet</p></div>;
}

ProductBreakDown.propTypes = {
  meta: PropTypes.shape(
    {
      product_id: PropTypes.string,
      ratings: PropTypes.shape(
        {
          1: PropTypes.string,
          2: PropTypes.string,
          3: PropTypes.string,
          4: PropTypes.string,
          5: PropTypes.string,
        },
      ),
      characteristics: PropTypes.shape(
        {
          Fit: PropTypes.shape(
            {
              id: PropTypes.number,
              value: PropTypes.string,
            },
          ),
          Width: PropTypes.shape(
            {
              id: PropTypes.number,
              value: PropTypes.string,
            },
          ),
          Comfort: PropTypes.shape(
            {
              id: PropTypes.number,
              value: PropTypes.string,
            },
          ),
          Quality: PropTypes.shape(
            {
              id: PropTypes.number,
              value: PropTypes.string,
            },
          ),
          Length: PropTypes.shape(
            {
              id: PropTypes.number,
              value: PropTypes.string,
            },
          ),
          Size: PropTypes.shape(
            {
              id: PropTypes.number,
              value: PropTypes.string,
            },
          ),
        },
      ),
    },
  ).isRequired,
  reviews: PropTypes.arrayOf(
    PropTypes.shape(
      {
        review_id: PropTypes.number,
        rating: PropTypes.number,
        summary: PropTypes.string,
        recommend: PropTypes.bool,
        body: PropTypes.string,
        date: PropTypes.string,
        reviewer_name: PropTypes.string,
        helpfulness: PropTypes.number,
        photos: PropTypes.arrayOf(
          PropTypes.shape(
            {
              id: PropTypes.number,
              url: PropTypes.string,
            },
          ),
        ),
      },
    ),
  ).isRequired,
};

function CharacteristicsWidget({ name }) {
  const text = {
    Fit: { left: 'Too tight', middle: 'Perfect', right: 'Too loose' },
    Comfort: { left: 'Uncomfortable', middle: 'Average', right: 'Comfortable' },
    Length: { left: 'Too short', middle: 'Perfect', right: 'Too long' },
    Quality: { left: 'Poor', middle: 'Average', right: 'Great' },
    Size: { left: 'Too small', middle: 'Just right', right: 'Too large' },
    Width: { left: 'Too thin', middle: 'Just right', right: 'Too wide' },
  };
  return (
    <div className="characteristics">
      {name}
      <div className="characteristics-bar">
        <img alt="" className="characteristics-arrow" src="./img/rr/arrow.svg" />
      </div>
      <div className="characteristics-description">
        <p className="rr-left">{text[name].left}</p>
        <p className="rr-middle">{text[name].middle}</p>
        <p className="rr-right">{text[name].right}</p>
      </div>
    </div>
  );
}

CharacteristicsWidget.propTypes = {
  name: PropTypes.string.isRequired,
};

export default ProductBreakDown;
