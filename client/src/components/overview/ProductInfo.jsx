import React from 'react';
import axios from 'axios';
import config from '../../../../config.js';


const ProductInfo = ({ product }) => {
    return (
      <div className="ov-infoBox">
        <div className="ov-infoBox_reviewbox">
          [review starts]
          [go to reviews button]
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
      </div>
    )
}



export default ProductInfo;