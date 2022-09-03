import React from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const YOCard = ({open, currentInfo, currentStyle}) => {
  if (!open) return null

  const removeDiv = () => {
    const getDiv = document.getElementById("rc-yo-card-div")
    if (getDiv.style.display === "none") {
      getDiv.style.display = "block";
    } else {
      getDiv.style.display = "none";
    }
  }

  return (
    <div id = "rc-yo-card-div" className = "rc-yo-card">
      {/* onClick of the X: remove card and replace it back with the ADD TO OUTFIT */}
      <button className = "rc-yo-remove-button" onClick = {() => removeDiv()}><AiOutlineCloseCircle/></button>
      <img className = "rc-card-photos" src = {currentStyle.results[0].photos[0].thumbnail_url}/>
      <p>{currentInfo.category}</p>
      <p className = "rc-card-name">{currentInfo.name}</p>
      <p>{currentInfo.default_price}</p>
    </div>
  )
}

export default YOCard;