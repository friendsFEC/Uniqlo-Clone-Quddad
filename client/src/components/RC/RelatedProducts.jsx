import React from 'react';
import axios from 'axios';
import config from '../../../../config.js'
import { AiOutlineStar } from 'react-icons/ai';
import Modal from './Modal.jsx'
import { useState, useEffect } from 'react';

const RelatedProducts = (props) => {
  const noPhoto = "https://icon-library.com/images/no-picture-available-icon/no-picture-available-icon-1.jpg"
  const [isOpen, setIsOpen] = useState(false);

  // console.log('RPStyles:', props.RPStyles)
  // DPStyles is where we will get default? and thumbnail_url
  // console.log('DPStyles: ', props.DPStyles)
  // console.log(props.notDPStyles)

  // const getPhoto = () => {
  //   return (
  //     <div>
  //       {props.RPStyles.map(style => {
  //         if (style["default?"]) {
  //           return <img src = {style.photos[0].thumbnail_url}/>
  //         }
  //       })}
  //     </div>
  //   )
  // }

  const createRPCard = () => {
    return (
      <div>
      {props.RPInfo.map(product => {
        return <div className = "rc-main" key = {product.id}>
          <div className = "rc-small-titles">
          <button className = "rc-rp-button"
          onClick = {() => isOpen ? setIsOpen(false) : setIsOpen(true)}>
          <AiOutlineStar/>
          </button>
          <Modal open={isOpen} product = {product} currentInfo = {props.currentInfo}/>
          <p>{product.category}</p>
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