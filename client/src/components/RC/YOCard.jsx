/* eslint-disable */
import React from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import Stars from './Stars.jsx'

const YOCard = ({open, currentInfo, currentStyle, currentRating, relatedAverageRatings}) => {
  if (!open) return null

  const removeDiv = () => {
    const getDiv = document.getElementById("rc-yo-new-card")
    if (getDiv.style.display === "none") {
      getDiv.style.display = "block";
    } else {
      getDiv.style.display = "none";
    }
  }

  return (
    <div id = "rc-yo-new-card">
      <div className = "rc-yo-card-details">
        <button className = "rc-yo-remove-button" onClick = {() => removeDiv()}><AiOutlineCloseCircle/></button>
        <img className = "rc-card-photos" src = {currentStyle.results[0].photos[0].thumbnail_url}/>
        <p>{currentInfo.category}</p>
        <p className = "rc-card-name">{currentInfo.name}</p>
        <p>{currentInfo.default_price}</p>
        < Stars currentRating = {currentRating} relatedAverageRatings = {relatedAverageRatings}/>
      </div>
    </div>
  )
}

export default YOCard;