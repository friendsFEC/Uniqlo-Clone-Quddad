/* eslint-disable */
import React from 'react';
import { useState, useEffect } from 'react';
import YOCard from './YOCard.jsx'
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';

const YourOutfit = ( {productID, currentInfo, currentStyle, currentRating} ) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [isReadyToAdd, setIsReadyToAdd] = useState(false);
  const [infoStorage, setInfoStorage] = useState([]);
  const [styleStorage, setStyleStorage] = useState([]);
  const [ratingStorage, setRatingStorage] = useState([]);

  const removeDiv = () => {
    const getDiv = document.getElementById("rc-removable-div")
    if (getDiv.style.display === "none") {
      getDiv.style.display = "block";
    } else {
      getDiv.style.display = "none";
    }
  }

  const changeState = () => {
    setIsOpen(false);
    setIsClosed(true);
  }

  const addInfo = () => {
    let info = infoStorage.slice();
    info.push(currentInfo);
    setInfoStorage(info);

    let style = styleStorage.slice();
    style.push(currentStyle);
    setStyleStorage(style);

    let rating = ratingStorage.slice();
    rating.push(currentRating);
    setRatingStorage(rating);
  }

  // useEffect(
  //   () => {
  //     setIsReadyToAdd(true)
  //   },
  //   [productID]
  // )

  // ideas:
  // for the onclick of add to your outfit:
  // will search through infostorage
  // if present --> alert
  // if not --> add outfit

  // want to set isReadyToAdd flag which will turn true when we change currentProduct
  // can this be done using useEffect?

  return (
    <div>
      <h3 className = "rc-title"> Your Outfit </h3>
      <div className = "rc-yo-container">
        {/* < GrFormPrevious className = "rc-rp-arrow"/> */}

        <div id = "rc-removable-div">
          <div className = "rc-yo-card">
            <div id = "rc-yo-add-button-div">
              <button className = "rc-yo-add-button" onClick = {() => {
                setIsOpen(true);
                removeDiv();
                addInfo();
              }}>Add to Your Outfit</button>
            </div>
          </div>
        </div>

        {/* {console.log(infoStorage, 'INFO STORAGE DURING RENDER')} */}
        {/* {console.log(styleStorage, 'STYLE STORAGE DURING RENDER')}
        {console.log(ratingStorage, 'RATING STORAGE DURING RENDER')} */}

        {infoStorage.map((product, index) => {
          return (<div key = {index}>
            <YOCard open = {isOpen} currentInfo = {infoStorage[index]} currentStyle = {styleStorage[index]} currentRating = {ratingStorage[index]} changeState = {changeState}/>
            </div>
          )
        })}

        {isOpen ?
        <div className = "rc-yo-card">
          <div id = "rc-yo-add-button-div">
            <button className = "rc-yo-add-button" onClick = {() => {addInfo()}}>
              Add to Your Outfit</button>
            {/* <button className = "rc-yo-add-button" onClick = {() => {
            isReadyToAdd ? console.log('working')
            : alert("This product is already a part of Your Outfit!")}}>
              Add to Your Outfit</button> */}
          </div>
        </div> : null}

        {isClosed ?
        <div id = "rc-removable-div">
          <div className = "rc-yo-card">
            <div id = "rc-yo-add-button-div">
              <button className = "rc-yo-add-button" onClick = {() => {
                removeDiv();
              }}>REMOVED</button>
            </div>
          </div>
        </div>
        : null}

      {/* < GrFormNext className = "rc-rp-arrow"/> */}
      </div>
    </div>
  )
}

export default YourOutfit;