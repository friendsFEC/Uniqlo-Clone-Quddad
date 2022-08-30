import React from 'react';
import axios from 'axios';
import RelatedProductsEntry from './RelatedProductsEntry.jsx'
import config from '../../../../config.js'
import { AiOutlineStar } from 'react-icons/ai';
import Modal from './Modal.jsx'
import { useState, useEffect } from 'react';

const RelatedProducts = (props) => {

  const [isOpen, setIsOpen] = useState(false);

  // console.log('RPStyles:', props.RPStyles)
  // console.log('DPStyles: ', props.DPStyles)
  console.log(props.RPInfo)

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
          <Modal open={isOpen} features={product.features}>Fancy Modal</Modal>
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