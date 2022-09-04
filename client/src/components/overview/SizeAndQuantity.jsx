// currentstyle.skus > each key is sku id and each sku is an object
// goes xs s m l xl xxl
// 65632 has out of stuck > sku key will say 'null'
import _, { map } from 'underscore';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// sizes is an object of skus passed from Overview

function SizeAndQuantity({ sizes }) {
  const [sizeId, setSizeId] = useState('');

  const changeSize = (option) => {
    const newId = option.value;
    setSizeId(newId);
  };

  console.log(sizes[sizeId]);

  // quantity is - if no size selected 1 if size selected
  if (sizes.null) {
    return <p>OUT OF STOCK</p>;
  }

  return (
    <div>
      <select onChange={({ target }) => changeSize(target)}>
        <option>size</option>
        {_.map(sizes, (property, id) => (
          <option value={id}>{property.size}</option>
        ))}
      </select>
      <select>
        {sizeId === '' ? <option>-</option> : _.range(1, sizes[sizeId].quantity).map((num) => (
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


