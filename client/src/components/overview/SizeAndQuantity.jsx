import _ from 'underscore';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AddToCart from './AddToCart';

// sizes is an object of skus passed from Overview

export default function SizeAndQuantity({ sizes }) {
  const [sizeId, setSizeId] = useState('noSize');
  const [count, setCount] = useState('1');
  let quantity = 0;

  const changeSize = (option) => {
    const newId = option;
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
      <FormControl>
        <InputLabel>Size</InputLabel>
        <Select
          defaultValue=""
          onChange={(e) => { changeSize(e.target.value); }}
          autoWidth
          label="Size"
        >
          {_.map(sizes, (property, id) => (
            property.size && <MenuItem key={id} value={id}>{property.size}</MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* -- end of size selector */}
      <FormControl>
        <Select
          displayEmpty
          onChange={(e) => { setCount(e.target.value); }}
          autoWidth
          label="Size"
        >
          <MenuItem><em>-</em></MenuItem>
          {_.range(1, quantity).map((num) => (
            <MenuItem key={num} value={num}>{num}</MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* --end of quantity selector */}
      <AddToCart count={count} sizeId={sizeId} />
    </div>
  );
}

// Prop validation
SizeAndQuantity.propTypes = {
  sizes: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
