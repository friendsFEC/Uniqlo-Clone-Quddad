import React from 'react';

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

export default PriceTag;
