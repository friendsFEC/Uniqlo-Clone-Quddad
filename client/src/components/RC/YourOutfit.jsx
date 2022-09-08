/* eslint-disable */
import React from 'react';
import { useState, useEffect } from 'react';
import YOCard from './YOCard.jsx'
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';

const YourOutfit = ( {productID, currentInfo, currentStyle, currentRating} ) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isReadyToAdd, setIsReadyToAdd] = useState(true);
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

  // ratings don't match up yet

  const addProduct = () => {
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

  const removeProduct = (e, product) => {
    e.preventDefault();
    let info = infoStorage.slice();
    let filteredInfo = info.filter(obj => {
      if (obj.id !== product.id) {return obj};
    });
    setInfoStorage(filteredInfo);

    let style = styleStorage.slice();
    let filteredStyle = style.filter(obj => {
      if (Number(obj.product_id) !== product.id) {return obj};
    })
    console.log(filteredStyle, 'FILTERED STYLE')
    setStyleStorage(filteredStyle);

    // let rating = ratingStorage.slice();
    // let filteredRating = rating.filter(obj => {
    //   if (obj.id !== product.id) {return obj};
    // })
    // for (let i = 0; i < rating.length; i++)
    // setRatingStorage(filteredRating);
  }

  useEffect(
    () => {
      setIsReadyToAdd(true)
    },
    [productID]
  )

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
                setIsReadyToAdd(false);
                removeDiv();
                addProduct();
              }}>Add to Your Outfit</button>
            </div>
          </div>
        </div>

        {/* {console.log(infoStorage, 'INFO STORAGE DURING RENDER')} */}
        {/* {console.log(styleStorage, 'STYLE STORAGE DURING RENDER')} */}
        {/* {console.log(ratingStorage, 'RATING STORAGE DURING RENDER')} */}

        {infoStorage.map((product, index) => {
          return (<div key = {index}>
            <YOCard open = {isOpen} currentInfo = {infoStorage[index]} currentStyle = {styleStorage[index]} currentRating = {ratingStorage[index]} product = {product} removeProduct = {removeProduct} index = {index}/>
            </div>
          )
        })}

        {isOpen ?
        <div className = "rc-yo-card">
          <div id = "rc-yo-add-button-div">
            <button className = "rc-yo-add-button" onClick = {() => {
            isReadyToAdd ? (addProduct(), setIsReadyToAdd(false))
            : alert("This product is already a part of Your Outfit!")}}>
              Add to Your Outfit</button>
          </div>
        </div> : null}

      {/* < GrFormNext className = "rc-rp-arrow"/> */}
      </div>
    </div>
  )
}

export default YourOutfit;