import React from 'react';
import { useState, useEffect } from 'react';

const MainImageCarousel = ({ photosData, dispatch, selected }) => {
  const [current, setCurrent] = useState(selected);

  useEffect(()=> setCurrent(selected), [selected]);

  const handleClick = (index) => {
    dispatch({type: 'changeImage', idx: index})
    setCurrent(index);
  }

  return (
    <div className="ov-imageBox_thumbnail">
    {photosData.map((photo, index) => {
      return (
        <div className={current === index ? 'ov-thumbnail ov-thumbnail--active' : 'ov-thumbnail'} key={index} onClick={()=> handleClick(index)}>
          <img className="ov-thumbnail--image"src={photo.thumbnail_url}/>
        </div>
      )
    })}
  </div>
  )
}

export default MainImageCarousel;