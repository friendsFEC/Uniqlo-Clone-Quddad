import React from 'react';
import { IoIosCheckmarkCircle } from 'react-icons/io';

//becoming an exceptionally good engineer

const StyleGrid = ({ styleData, changeStyle, active }) => {
  return (
    <div className="ov-styleGrid">
      {styleData.map((style, index) => {
        return (
          <div className="ov-thumbnail ov-checkDiv" onClick={()=>changeStyle(index)} key={index}>
            <IoIosCheckmarkCircle className={active === index ? " ov-check ov-check--active" : "ov-check"}/>
            <img className={active === index ? "ov-thumbnail--image ov--style ov--style--active" : "ov-thumbnail--image ov--style"}src={style.photos[0].thumbnail_url}/>
          </div>
        )
      })}
    </div>
  )
}

export default StyleGrid;