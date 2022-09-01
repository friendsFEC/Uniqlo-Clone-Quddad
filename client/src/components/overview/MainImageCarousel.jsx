import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { GrFormDown, GrFormUp } from 'react-icons/gr';

const MainImageCarousel = ({ photosData, dispatch, selected }) => {
  const [current, setCurrent] = useState(selected);
  const upButton = useRef(null);
  const downButton = useRef(null);

  useEffect(()=> setCurrent(selected), [selected]);

  const handleClick = (index) => {
    dispatch({type: 'changeImage', idx: index})
    setCurrent(index);
  }

  const showNav = () => {
    upButton.current.style.opacity = 0.80;
    downButton.current.style.opacity = 0.80;
  }

  const hideNav = () => {
    upButton.current.style.opacity = 0;
    downButton.current.style.opacity = 0;
  }

  return (
    <div className='ov-carousel_wrapper' onMouseEnter={showNav} onMouseLeave={hideNav}>
      <div className='ov-carousel_button' style={{opacity: 0, transition: 'opacity ease-in-out 0.2s'}} ref={upButton}>
        <GrFormUp />
      </div>
    <div className="ov-imageBox_thumbnail">
      {photosData.map((photo, index) => {
        return (
          <div className={current === index ? 'ov-thumbnail ov-thumbnail--active' : 'ov-thumbnail'} key={index} onClick={()=> handleClick(index)}>
            <img className="ov-thumbnail--image"src={photo.thumbnail_url}/>
          </div>
        )
      })}
    </div>
    <div  className='ov-carousel_button' style={{opacity: 0, transition: 'opacity ease-in-out 0.2s'}}ref={downButton}>
      <GrFormDown/>
    </div>
    </div>
  )
}

export default MainImageCarousel;