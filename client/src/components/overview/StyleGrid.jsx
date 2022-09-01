import React from 'react';

//becoming an exceptionally good engineer

const StyleGrid = ({ styleData, changeStyle, active }) => {
  return (
    <div className="ov-styleGrid">
      {styleData.map((style, index) => {
        return (
          <div onClick={()=>changeStyle(index)} key={index}>

            <img className={active === index ? "ov-thumbnail--image ov--style ov--style--active" : "ov-thumbnail--image ov--style"}src={style.photos[0].thumbnail_url}/>
          </div>
        )
      })}
    </div>
  )
}

export default StyleGrid;