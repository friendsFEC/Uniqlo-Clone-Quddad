import React from 'react';

const ProductImage = ({ photosData }) => {
  return (
    <div className="ov-imageBox">
      <div className="ov-imageBox_carousel">c/na/nr/no/nu/ns/ne/nl</div>
      {photosData.map((photo) => <img src={photo.url}/>)}
    </div>
  )
}


export default ProductImage;