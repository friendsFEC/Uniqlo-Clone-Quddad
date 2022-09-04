// currentstyle.skus > each key is sku id and each sku is an object
// goes xs s m l xl xxl
// 65632 has out of stuck > sku key will say 'null'
import _, { map } from 'underscore';
import React from 'react';
import PropTypes from 'prop-types';

<<<<<<< HEAD
function SizeAndQuantity({
  style
}: {
  style: object;
}) {
=======
function SizeAndQuantity({ style }) {
>>>>>>> extends
  // console.log(style);
  // drop down for size
  // if size doesn't exist, it doesn't show - (maybe show it crossed?)

  // quantity is - if no size selected 1 if size selected
  if (style.skus.null) {
    return null;
  }
  return (
    <div>
      <select>
        trying
      </select>
    </div>
  );
}

SizeAndQuantity.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default SizeAndQuantity;
