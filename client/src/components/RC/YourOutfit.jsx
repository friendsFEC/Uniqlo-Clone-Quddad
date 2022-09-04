/* eslint-disable */
import React from 'react';
import { useState, useEffect } from 'react';
import YOCard from './YOCard.jsx'
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';

const YourOutfit = ( {currentInfo, currentStyle, currentRating, relatedAverageRatings} ) => {
  const [isOpen, setIsOpen] = useState(false);

  const removeDiv = () => {
    const getDiv = document.getElementById("rc-yo-add-button-div")
    if (getDiv.style.display === "none") {
      getDiv.style.display = "block";
    } else {
      getDiv.style.display = "none";
    }
  }

  // set a count of your outfit cards
  // when click on add to your outfit, increment
  // when click on X, decrement
  // for each count, render out a card
  // useReducer here?


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
              }}>Add to Your Outfit</button>
            </div>
            <YOCard open = {isOpen} currentInfo = {currentInfo} currentStyle = {currentStyle} currentRating = {currentRating} relatedAverageRatings = {relatedAverageRatings} />
          </div>
          {/* < GrFormNext className = "rc-rp-arrow"/> */}
        </div>
    </div>
  )
}

export default YourOutfit;