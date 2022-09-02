import React, { useReducer, useState, useRef } from 'react';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import MainImageCarousel from './MainImageCarousel.jsx';


const ProductImage = ({ photosData, extended, toggleView }) => {
  const length = photosData.length;
  const image = useRef(null);

  //reducer function for button functionality
  const selectImage = (count, action) => {
    //action -> {type: 'changeImage'}
    switch(action.type) {
      case 'next':
        if (count < length) {
          return count = count + 1;
        }
      case 'prev':
        if (count !== 0) {
          return count = count - 1;
        }
      case 'changeImage':
        return count = action.idx
        default:
          return count;
      }
  }

  const [count, dispatch] = useReducer(selectImage, 0);

  // const handleClick = () => {
  //   image.current.style.width = '800px';
  //   toggleView(!extended);
  // }

  return (
    <div className={extended ? "ov-imageBox ov-imageBox--extended ov-imageBox" : "ov-imageBox"}>
      <MainImageCarousel photosData={photosData} dispatch={dispatch} selected={count}/>
      {count > 0 && <GrFormPrevious className="ov-imageBox_prev ov-btn" onClick={() => dispatch({type:'prev'})}/>}
      {count < length - 1 && <GrFormNext className="ov-imageBox_next ov-btn" onClick={() => dispatch({type: 'next'})}/>}
      <div className="ov-imageBox ov-MainImageBox">
        {photosData.map((photo, index) => {
          return (
            <div key={index}
              ref={image}
              className={index === count ? 'ov-imageBox_activeSlide' :'ov-imageBox_slide'}
              onClick={() => toggleView(!extended)}
              >
              <img className={extended ? "ov-imageBox_mainImage ov-img--extended" :"ov-imageBox_mainImage"} src={photo.url}/>
            </div>
          )
        })}
      </div>
    </div>
  )
}


export default ProductImage;