// currentstyle.skus > each key is sku id and each sku is an object
// goes xs s m l xl xxl
// 65632 has out of stuck > sku key will say 'null'
import _ from 'underscore';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// sizes is an object of skus passed from Overview

function SizeAndQuantity({ sizes }) {
  const [sizeId, setSizeId] = useState('noSize');
  let quantity = 0;

  const changeSize = (option) => {
    const newId = option.value;
    setSizeId(newId);
  };

  if (sizeId !== 'noSize') {
    quantity = sizes[sizeId].quantity > 15 ? 16 : sizes[sizeId].quantity + 1;
  } else {
    quantity = 0;
  }

  // quantity is - if no size selected 1 if size selected
  if (sizes.null) {
    return <p>OUT OF STOCK</p>;
  }

  return (
    <div>
      <select onChange={({ target }) => changeSize(target)}>
        <option value="noSize">Select Size</option>
        {_.map(sizes, (property, id) => (
          <option value={id}>{property.size}</option>
        ))}
      </select>
      <select>
        {sizeId === 'noSize' ? <option>-</option> : _.range(1, quantity).map((num) => (
          <option value={num}>{num}</option>
        ))}
      </select>
    </div>
  );
}

SizeAndQuantity.propTypes = {
  sizes: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default SizeAndQuantity;
