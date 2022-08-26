import React from 'react';
import axios from 'axios';
import config from '../../../../config.js';


const ProductInfo = () => {
  axios.get('/products/65631', {
    baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/rfp/',
    headers: {
      'Authorization': config.TOKEN
    }
  }).then((res) => (console.log(res.data)));
  return (
    <div className="ov-infoBox">
      This will be the title
    </div>
  )
}



export default ProductInfo;