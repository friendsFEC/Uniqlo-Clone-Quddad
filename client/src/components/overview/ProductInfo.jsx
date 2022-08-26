import React from 'react';
import axios from 'axios';
import config from '../../../../config.js';


const ProductInfo = ({ product }) => {
    return (
      <div className="ov-infoBox">
        {product.name}
      </div>
    )
}



export default ProductInfo;