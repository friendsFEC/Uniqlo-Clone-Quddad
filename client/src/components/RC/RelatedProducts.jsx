import React from 'react';
import axios from 'axios';
import RelatedProductsEntry from './RelatedProductsEntry.jsx'
import config from '../../../../config.js'
import { AiOutlineStar } from 'react-icons/ai';

const RelatedProducts = (props) => {

  const createRPCard = () => {
    return (
      <div>
      {props.RPInfo.map(product => {
        return <div className = "rc-main" key = {product.id}>
          <div className = "rc-small-titles">
          <button className = "rc-rp-button"><AiOutlineStar/></button>
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