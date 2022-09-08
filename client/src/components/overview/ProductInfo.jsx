import React from 'react';
import StarRating from './StarRating';

export default function ProductInfo({ product, rating }) {
  return (
    <div>
      <div className="ov-infoBox_reviewbox">
        <StarRating rating={rating} />
      </div>
      <div>
        <h3 className="ov-title">{product.name}</h3>
        <p>{product.category}</p>
      </div>
    </div>
  );
}
