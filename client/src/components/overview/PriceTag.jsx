import React from 'react';
import PropTypes from 'prop-types';

function PriceTag({ product }) {
  return (
    <div>
      <span
        className={product.sale_price === null ? '.ov-title_price' : 'ov-title_price--onsale '}
      >
        $
        {product.original_price}
      </span>
      {product.sale_price && <span className=".ov-title_price">${product.sale_price}</span>}
    </div>
  );
}

PriceTag.propTypes = {
  product: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
export default PriceTag;
