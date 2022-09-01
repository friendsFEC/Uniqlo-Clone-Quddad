import React from 'react';
import axios from 'axios';
import config from '../../../../config.js'
import { AiOutlineStar } from 'react-icons/ai';
import Modal from './Modal.jsx'
import { useState, useEffect } from 'react';

const RelatedProducts = ( { currentInfo, relatedIDs, relatedInfo, relatedStyles }) => {
  const noPhoto = "https://icon-library.com/images/no-picture-available-icon/no-picture-available-icon-1.jpg"
  const [isOpen, setIsOpen] = useState(false);

  // const getDefaultPhoto = () => {
  //   const photos = [];
  //   for (let i = 0; i < relatedStyles.length; i++) {
  //     for (let j = 0; j < relatedStyles.length; j++) {
  //       if (relatedStyles[i].results[j]["default?"]) {
  //         photos.push(relatedStyles[i].results[j].photos[0].thumbnail_url);
  //       }
  //       // if all defaults are false, do something
  //       // how to check if all defaults are false
  //     }
  //   }
  //   console.log(photos)
  // }

  const createRPCard = () => {
      return (
      <div>
      {relatedInfo.map((product, index) => {
        return <div className = "rc-main" key = {index}>
          <div className = "rc-small-titles">
            <button className = "rc-rp-button"
              onClick = {() => isOpen ? setIsOpen(false) : setIsOpen(true)}>
              <AiOutlineStar/>
            </button>
            <Modal open={isOpen} currentInfo = {currentInfo} product = {product} index = {index} relatedInfo = {relatedInfo}/>
            <div className = "rc-rp-details">
              <img className = "rc-card-photos" src = {relatedStyles[index] ? relatedStyles[index].results[0].photos[0].thumbnail_url || noPhoto : null}/>
              <p>{product.category}</p>
              <p className = "rc-card-name">{product.name}</p>
              <p>${Math.round(product.default_price)}</p>
            </div>
          </div>
        </div>
      })}
    </div>
    )
  }

  return (
    <div>
      <h3 className = "rc-title"> Related Products </h3>
      <div className = "rc-card-layout">{createRPCard()}</div>
    </div>
  )
}

export default RelatedProducts;