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
        return <div className = "rc-main" key = {product.id}>
          <div className = "rc-small-titles">
          <button className = "rc-rp-button"
          onClick = {() => isOpen ? setIsOpen(false) : setIsOpen(true)}>
          <AiOutlineStar/>
          </button>
          <Modal open={isOpen} product = {product} currentInfo = {currentInfo}/>
          <img className = "rc-rp-photos" src = {relatedStyles[index].results[0].photos[0].thumbnail_url || noPhoto}/>
          <p className = "rc-rp-category">{product.category}</p>
          <p className = "rc-rp-name">{product.name}</p>
          <p className = "rc-rp-price">${Math.round(product.default_price)}</p>
          </div>
        </div>
      })}
    </div>
    )
  }

  return (
    <div>
      <h3 className = "rc-title"> Related Products </h3>
      {createRPCard()}
    </div>
  )
}

export default RelatedProducts;