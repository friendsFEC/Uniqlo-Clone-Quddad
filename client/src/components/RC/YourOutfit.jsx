import React from 'react';
import { useState, useEffect } from 'react';
// import { AiOutlineCloseCircle } from 'react-icons/ai';
import YOCard from './YOCard.jsx'

const YourOutfit = ( {currentInfo, currentStyle} ) => {
  const [isOpen, setIsOpen] = useState(false);

  const removeDiv = () => {
    const getDiv = document.getElementById("rc-yo-add-button-div")
    if (getDiv.style.display === "none") {
      getDiv.style.display = "block";
    } else {
      getDiv.style.display = "none";
    }
  }

  return (
    <div>
      <h3 className = "rc-title">Your Outfit</h3>
        <div className = "rc-yo-main">
          <div id ="rc-yo-add-button-div">
            <button className = "rc-yo-add-button" onClick = {() => {
              setIsOpen(true);
              removeDiv();
            }}>Add to Your Outfit</button>
          </div>
        <YOCard open = {isOpen} currentInfo = {currentInfo} currentStyle = {currentStyle}/>
      </div>
    </div>
  )
}

export default YourOutfit;