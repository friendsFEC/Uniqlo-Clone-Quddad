import React from 'react';
import { useState } from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';

const ProductImage = ({ photosData }) => {
  const [current, setCurrent] = useState(0);
  const length = photosData.length;

  const changeToNext = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  }

  const changeToPrev = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  }

  return (
    <div className="ov-imageBox">
      <AiOutlineArrowLeft className="ov-imageBox_prev" onClick={changeToPrev}/>
      <AiOutlineArrowRight className="ov-imageBox_next" onClick={changeToNext}/>
      {photosData.map((photo, index) => {
        return (
          <div key={index} className={index === current ? 'ov-imageBox_activeSlide' : 'ov-imageBox_slide'}>
            {index === current && <img className="ov-imageBox_mainImage"src={photo.url}/>}
          </div>
        )
      })}
    </div>
  )
}


export default ProductImage;