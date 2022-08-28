import React from 'react';

const ProductImage = ({ style }) => {
  return (
    <div className="ov-imageBox">
      <div className="ov-imageBox_carousel">c/na/nr/no/nu/ns/ne/nl</div>
      <div>
      <img id="ov-mainImage" src={style.photos[0].url}/>
      </div>
    </div>
  )
}


export default ProductImage;