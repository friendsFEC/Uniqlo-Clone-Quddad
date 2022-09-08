import _ from 'underscore';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AddToCart from './AddToCart';

// sizes is an object of skus passed from Overview

export default function SizeAndQuantity({ sizes }) {
  const [sizeId, setSizeId] = useState('noSize');
  const [count, setCount] = useState('1');
  let quantity = 0;

  const changeSize = (option) => {
    const newId = option.value;
    setSizeId(newId);
  };

  // sets the number of quantity according to business requirements
  if (sizeId !== 'noSize' && sizes[sizeId]) {
    quantity = sizes[sizeId].quantity > 15 ? 16 : sizes[sizeId].quantity + 1;
  } else {
    quantity = 0;
  }

  // renders out of stuck if selected style doesn't have sizes available
  if (sizes.null) {
    return <p>OUT OF STOCK</p>;
  }

  return (
    <div className="ov-selectorContainer">
        <select className="ov-dropdown" onChange={({ target }) => changeSize(target)}>
          {sizeId === 'noSize' && <option value="noSize">Select Size</option>}
          {_.map(sizes, (property, id) => (
            property.size && <option key={id} value={id}>{property.size}</option>
          ))}
        </select>
        {/* -- end of size selector */}
        <select className="ov-dropdown" onChange={({ target }) => setCount(target.value)}>
          {sizeId === 'noSize' ? <option>-</option> : _.range(1, quantity).map((num) => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
        {/* --end of quantity selector */}
      <AddToCart count={count} sizeId={sizeId} />
    </div>
  );
}

// Prop validation
SizeAndQuantity.propTypes = {
  sizes: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
