import React from 'react';
import { useState } from 'react';
import MainImageCarousel from './MainImageCarousel.jsx';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';

const ProductImage = ({ photosData }) => {
  const [current, setCurrent] = useState(0);
  const [activeThumbNail, setActive] = useState(false);
  const length = photosData.length;

  const changeToNext = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  }

  const changeToPrev = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  }

  const changeImage = (e,idx) => {
    setCurrent(idx);
  }

  return (
    <div className="ov-imageBox">
      <MainImageCarousel photosData={photosData} changeImage={changeImage} selected={current}/>
      {current > 0 && <AiOutlineArrowLeft className="ov-imageBox_prev ov-btn" onClick={changeToPrev}/>}
      {current < length - 1 && <AiOutlineArrowRight className="ov-imageBox_next ov-btn" onClick={changeToNext}/>}
      {photosData.map((photo, index) => {
        return (
          <div key={index} className={index === current ? 'ov-imageBox_activeSlide' : 'ov-imageBox_slide'}>
            <img className="ov-imageBox_mainImage"src={photo.url}/>
          </div>
        )
      })}
    </div>
  )
}


export default ProductImage;