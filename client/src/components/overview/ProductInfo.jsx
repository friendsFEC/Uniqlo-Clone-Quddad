import React from 'react';
import axios from 'axios';
import StarRating from './StarRating.jsx'
import config from '../../../../config.js';


const ProductInfo = ({ product, rating }) => {
    return (
      <div className="ov-infoBox">
        <div className="ov-infoBox_reviewbox">
          <StarRating rating={rating}/>
          [go to reviews link]
        </div>
        <div className="ov-title">
          <p className="ov-title ov-title--Category">{product.category}</p>
          <p className="ov-title ov-title--Name">{product.name}</p>
        </div>
        <div className="ov-title ov-title--Price">
          [price]
        </div>
        <div>
              [style selector]
        </div>
        <div>
          [drop down menu for size selection]
        </div>
        <div>
          [add to card button]
        </div>
      </div>
    )
}



export default ProductInfo;