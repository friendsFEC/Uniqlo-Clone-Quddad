import React from 'react';
import { useState } from 'react';
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
      <div className="ov-imageBox_thumbnail">
        {photosData.map((photo, index) => {
          return (
            <div className="ov-thumbnail" key={index} onClick={(e)=> changeImage(e,index)}>
              <img className="ov-thumbnail--image"src={photo.thumbnail_url}/>
            </div>
          )
        })}
      </div>
      <AiOutlineArrowLeft className="ov-imageBox_prev ov-btn" onClick={changeToPrev}/>
      <AiOutlineArrowRight className="ov-imageBox_next ov-btn" onClick={changeToNext}/>
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