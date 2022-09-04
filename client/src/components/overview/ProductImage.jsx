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


// handler to extend the image
// working process

  const handleClick = () => {
    toggleView(!extended);
    image.current.style.cursor = image.current.style.cursor === 'zoom-out' ? 'zoom-in' : 'zoom-out';
    // image.current.style.width = image.current.style.width === '600px' ? '450px' : '600px';
    image.current.style.transition = 'width ease-in-out 2s';
    // image.current.style.transform= 'scaleX(2)';
  }

// returns side carousel component and the Main image in a map function
// all images are there and their opacity changes

  return (
    <div className={extended ? "ov-imageBox ov-imageBox--extended" : "ov-imageBox"}>
      <MainImageCarousel photosData={photosData} dispatch={dispatch} selected={count}/>
      {count > 0 && <GrFormPrevious className="ov-imageBox_prev ov-btn" onClick={() => dispatch({type:'prev'})}/>}
      {count < length - 1 && <GrFormNext className="ov-imageBox_next ov-btn" onClick={() => dispatch({type: 'next'})}/>}
      <div className={extended ? "ov-imageBox ov-imageBox--extended" : "ov-imageBox"}>
        {photosData.map((photo, index) => {
          return (
            <div
              key={index}
              className={index === count ? 'ov-imageBox_activeSlide' :'ov-imageBox_slide'}
              onClick={handleClick}
              >
              <img ref={image}
              className={extended ? "ov-img--extended" :"ov-imageBox_mainImage"}
                src={photo.url}/>
            </div>
          )
        })}
      </div>
    </div>
  )
}

//becoming an exceptionally good software engineer $250.000

// class name
//className={extended ? "ov-img--extended" :"ov-imageBox_mainImage"}


export default ProductImage;