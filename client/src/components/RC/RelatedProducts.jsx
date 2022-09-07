/* eslint-disable */
import React from 'react';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Modal from './Modal.jsx';
import Stars from './Stars.jsx';
import config from '../../../../config.js';
import { AiOutlineStar } from 'react-icons/ai';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';

const RelatedProducts = ( { currentInfo, relatedIDs, relatedInfo, relatedStyles, relatedAverageRatings, setProductId }) => {
  const noPhoto = "https://icon-library.com/images/no-picture-available-icon/no-picture-available-icon-1.jpg"
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProductID, setSelectedProductID] = useState(0);
  const listRef = useRef(null);
  const leftArrow = useRef(null);
  const rightArrow = useRef(null);

  const scrollLeft = () => {
    if (listRef.current) {
     listRef.current.scrollBy({
      top: 0,
      left: -30,
      behavior: 'smooth'
     })
    }
  };

  const scrollRight = () => {
    if (listRef.current) {
     listRef.current.scrollBy({
      top: 0,
      left: 30,
      behavior: 'smooth'
     })
    }
  };

  const showArrows = () => {
    leftArrow.current.style.opacity = 0.80;
    rightArrow.current.style.opacity = 0.80;
  }

  const hideArrows = () => {
    leftArrow.current.style.opacity = 0;
    rightArrow.current.style.opacity = 0;
  }

  const createRPCard = () => {
      return (
        <div className = "rc-slide-container" onMouseEnter = {showArrows} onMouseLeave = {hideArrows} >
          <div className = "rc-rp-arrow" onClick={scrollLeft} ref={leftArrow} style={{ opacity: 0, transition: 'opacity ease-in-out 0.2s' }}> < GrFormPrevious /> </div>
          <div className = "rc-rp-container" ref = {listRef}>
            {relatedInfo.map((product, index) => {
              if (relatedStyles[index]) {
                return (
                  <div className = "rc-rp-card" key = {index}>
                    <div className = "rc-small-titles">
                      <button className = "rc-rp-button" onClick = {() => isOpen ? setIsOpen(false) : (setIsOpen(true),  setSelectedProductID(product.id))}>
                        <AiOutlineStar/>
                      </button>
                      <Modal open={isOpen} selectedProductID = {selectedProductID} currentInfo = {currentInfo} product = {product} index = {index} relatedInfo = {relatedInfo}/>
                      <div className = "rc-rp-details">
                        <img className = "rc-card-photos" src = {relatedStyles[index].results[0].photos[0].thumbnail_url || noPhoto} onClick = {() => setProductId(product.id)}/>
                        <p>{product.category}</p>
                        <p className = "rc-card-name">{product.name}</p>
                        <p><span className = {relatedStyles[index].results[0].sale_price === null ? "rc-rp-og-price" : "rc-rp-sale-price"}>
                        ${relatedStyles[index].results[0].original_price}
                        </span>
                        {relatedStyles[index].results[0].sale_price && <span className ="rc-rp-og-price">${relatedStyles[index].results[0].sale_price}</span>}
                        </p>
                        <Stars index = {index} currentInfo = {currentInfo} relatedAverageRatings = {relatedAverageRatings} />
                    </div>
                  </div>
          </div>
                )}
              })}
              <div className = "rc-rp-arrow" onClick={scrollRight} ref={rightArrow}style={{ opacity: 0, transition: 'opacity ease-in-out 0.2s' }}/><GrFormNext /></div>
        </div>
    )
  }

  return (
    <div>
      <h3 className = "rc-title"> People Also Viewed </h3>
      <div>{createRPCard()}</div>
    </div>
  )
}

export default RelatedProducts;

  // IDEA FOR ARROWS:
  // change classname based on ternary
  // if at the front of the grid, hide left arrow
  // if at the end of the grid, hide right arrow