import React from 'react';
import axios from 'axios';
import StarRating from './StarRating.jsx'
import config from '../../../../config.js';

const ProductInfo = ({ product, rating }) => {
    return (
      <div>
        <div className="ov-infoBox_reviewbox">
          <StarRating rating={rating}/>
        </div>
        <div className="ov-title">
          <p className="ov-title ov-title--Category">{product.category}</p>
          <p className="ov-title ov-title--Name">{product.name}</p>
        </div>
      </div>
    )
}



export default ProductInfo;