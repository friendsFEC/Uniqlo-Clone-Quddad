/* eslint-disable */
import React from 'react';
import { useState, useEffect } from 'react';
import YOCard from './YOCard.jsx'
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';

const YourOutfit = ( {currentInfo, currentStyle, currentRating, relatedAverageRatings} ) => {
  const [isOpen, setIsOpen] = useState(false);
  const [infoStorage, setInfoStorage] = useState([]);
  // const [styleStorage, setStyleStorage] = useState([]);

  // when press "add to your outfit", add the current info to added info
  const addedInfo = [];

  const removeDiv = () => {
    // const getDiv = document.getElementsByClassName("rc-yo-card")
    // const getDiv = document.getElementById("rc-yo-add-button-div")
    const getDiv = document.getElementById("test")
    if (getDiv.style.display === "none") {
      getDiv.style.display = "block";
    } else {
      getDiv.style.display = "none";
    }
  }

  // in YOCard, do I need to now pass in the mapped product's information? probably yes. so currentInfo would need to be product's current info, etc.
  // how would we do this? --> keep track of all "added information" in state of this component
  // so this state would be updated as we cycle through products and add them to your outfit by clicking on the button
  // then we render your outfit based on this state

  return (
    <div>
      <h3 className = "rc-title"> Your Outfit</h3>
      <div className = "rc-yo-container">
        {/* < GrFormPrevious className = "rc-rp-arrow"/> */}

        <div id = "test">
          <div className = "rc-yo-card">
            <div id = "rc-yo-add-button-div">
              <button className = "rc-yo-add-button" onClick = {() => {
                setIsOpen(true);
                removeDiv();
                addedInfo.push(currentInfo);
                setInfoStorage(addedInfo);
              }}>Add to Your Outfit</button>
            </div>
            {/* <YOCard open = {isOpen} currentInfo = {currentInfo} currentStyle = {currentStyle} currentRating = {currentRating} relatedAverageRatings = {relatedAverageRatings} /> */}

          </div>
        </div>

        {infoStorage.map((product, index) => {
          return (<div key = {index}>
            <YOCard open = {isOpen} currentInfo = {currentInfo} currentStyle = {currentStyle} currentRating = {currentRating} relatedAverageRatings = {relatedAverageRatings}/>
            </div>
          )
        })}

        {isOpen ?
        <div className = "rc-yo-card">
          <div id = "rc-yo-add-button-div">
            <button className = "rc-yo-add-button" onClick = {() => {
            alert("This product is already apart of Your Outfit!")}}>Add to Your Outfit</button>
          </div>
        </div> : null}

      {/* < GrFormNext className = "rc-rp-arrow"/> */}
      </div>
    </div>
  )
}

export default YourOutfit;