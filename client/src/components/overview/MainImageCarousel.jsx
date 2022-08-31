import React from 'react';
import { useState, useEffect } from 'react';

const MainImageCarousel = ({ photosData, changeImage, selected }) => {
  const [current, setCurrent] = useState(selected);

  useEffect(()=> setCurrent(selected), [selected]);

  const handleClick = (e, index) => {
    changeImage(e, index);
    setCurrent(index);
  }

  return (
    <div className="ov-imageBox_thumbnail">
    {photosData.map((photo, index) => {
      return (
        <div className={current === index ? 'ov-thumbnail--active' : 'ov-thumbnail'} key={index} onClick={(e)=> handleClick(e,index)}>
          <img className="ov-thumbnail--image"src={photo.thumbnail_url}/>
        </div>
      )
    })}
  </div>
  )
}

export default MainImageCarousel;