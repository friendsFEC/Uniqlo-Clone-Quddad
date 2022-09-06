/* eslint-disable */
import React from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import Stars from './Stars.jsx'

const YOCard = ({open, currentInfo, currentStyle, currentRating, relatedAverageRatings, changeState}) => {
  if (!open) return null

  return (
      <div className = "rc-yo-card">
        <div className = "rc-yo-card-details">
          <button className = "rc-yo-remove-button" onClick = {() => changeState()}><AiOutlineCloseCircle/></button>
          <img className = "rc-card-photos" src = {currentStyle.results[0].photos[0].thumbnail_url}/>
          <p>{currentInfo.category}</p>
          <p className = "rc-card-name">{currentInfo.name}</p>
          <p>{currentInfo.default_price}</p>
          < Stars currentRating = {currentRating}/>
        </div>
      </div>
  )
}

export default YOCard;