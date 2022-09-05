/* eslint-disable */
import React from 'react';
import { useState, useEffect } from 'react';
import YOCard from './YOCard.jsx'
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';

const YourOutfit = ( {currentInfo, currentStyle, currentRating, relatedAverageRatings} ) => {
  const [isOpen, setIsOpen] = useState(false);
  const [infoStorage, setInfoStorage] = useState([]);

  // when press "add to your outfit", add the current info to added info
  const addedInfo = [];

  const removeDiv = () => {
    const getDiv = document.getElementsByClassName("rc-yo-card")
    if (getDiv.style.display === "none") {
      getDiv.style.display = "block";
    } else {
      getDiv.style.display = "none";
    }
  }

  return (
    <div>
      <h3 className = "rc-title"> Your Outfit</h3>
        <div className = "rc-yo-container">
        {/* < GrFormPrevious className = "rc-rp-arrow"/> */}


          <div className = "rc-yo-card">
            <div id = "rc-yo-add-button-div">
              <button className = "rc-yo-add-button" onClick = {() => {
                setIsOpen(true);
                removeDiv();
                addedInfo.push(currentInfo);
                setInfoStorage(addedInfo);
              }}>Add to Your Outfit</button>
            </div>
            <YOCard open = {isOpen} currentInfo = {currentInfo} currentStyle = {currentStyle} currentRating = {currentRating} relatedAverageRatings = {relatedAverageRatings} />
          </div>



          {isOpen ?
          <div className = "rc-yo-card">
            <div id = "rc-yo-add-button-div">
              <button className = "rc-yo-add-button" onClick = {() => {
              alert("Error: This product is already apart of Your Outfit!")}}>Add to Your Outfit</button>
            </div>
          </div> : null}






          {/* < GrFormNext className = "rc-rp-arrow"/> */}
        </div>
    </div>
  )
}

export default YourOutfit;