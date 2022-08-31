import React from 'react';
import axios from 'axios';
import config from '../../../../config.js'
import { AiOutlineStar } from 'react-icons/ai';
import Modal from './Modal.jsx'
import { useState, useEffect } from 'react';

const RelatedProducts = ( { currentInfo, relatedIDs, relatedInfo, relatedStyles }) => {
  const noPhoto = "https://icon-library.com/images/no-picture-available-icon/no-picture-available-icon-1.jpg"
  const [isOpen, setIsOpen] = useState(false);

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
          <p>{product.category}</p>
          {/* <p>{props.RPStyles.length > 0 ? props.RPStyles[index][0].photos[0].thumbnail_url : "No photo"}</p> */}
          <p>{product.name}</p>
          <p>{product.default_price}</p>
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