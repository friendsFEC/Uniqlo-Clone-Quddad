import React from 'react';

const ProductImage = ({ style }) => {
  return (
    <div className="ov-imageBox">
      <img id="ov-mainImage" src={style.photos[0].url}/>
    </div>
  )
}


export default ProductImage;