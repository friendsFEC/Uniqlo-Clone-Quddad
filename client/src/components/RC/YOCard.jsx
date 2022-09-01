import React from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const YOCard = ({open, currentInfo, currentStyle}) => {
  if (!open) return null
  console.log(currentInfo)
  console.log(currentStyle)
  return (
    <div className = "rc-yo-card">
      <button className = "rc-yo-remove-button"><AiOutlineCloseCircle/></button>
      <img className = "rc-rp-photos" src = {currentStyle.results[0].photos[0].thumbnail_url}/>
      <p className = "rc-rp-category">{currentInfo.category}</p>
      <p className = "rc-rp-name">{currentInfo.name}</p>
      <p className = "rc-rp-price">{currentInfo.default_price}</p>
    </div>
  )
}

export default YOCard;