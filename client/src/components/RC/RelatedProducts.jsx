import React from 'react';
import axios from 'axios';
import config from '../../../../config.js'
import { AiOutlineStar } from 'react-icons/ai';
import Modal from './Modal.jsx'
import { useState, useEffect } from 'react';
import RPSlider from './RPSlider.jsx';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';

const RelatedProducts = ( { currentInfo, relatedIDs, relatedInfo, relatedStyles }) => {
  const noPhoto = "https://icon-library.com/images/no-picture-available-icon/no-picture-available-icon-1.jpg"
  const [isOpen, setIsOpen] = useState(false);
  const [current, setCurrent] = useState(0);

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

  //have all images rendered first. flexbox, hide overflow

  const prevCard = () => {
    setCurrent(current === 0 ? relatedInfo.length - 1 : current - 1)
  }

  const nextCard = () => {
    setCurrent(current === relatedInfo.length - 1 ? 0 : current + 1)
  }

  console.log(relatedStyles)

  const createRPCard = () => {
      return (
      <div>
        < GrFormPrevious className = ".rc-rp-prev" onClick = {prevCard}/>
        {relatedInfo.map((product, index) => {
          return (
          <div className = "rc-main" key = {index}>
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
                <p><span className = {relatedStyles[index].results[0].sale_price === null ? "rc-rp-og-price" : "rc-rp-sale-price"}>
                  ${relatedStyles[index].results[0].original_price}
                </span>
                {relatedStyles[index].results[0].sale_price && <span className ="rc-rp-og-price">${relatedStyles[index].results[0].sale_price}</span>}
                </p>
              </div>
            </div>
          </div>
        // this code: onClick renders one card and shuffles through all cards
        //   <div>
        //   {index === current && (          <div className = "rc-main" key = {index}>
        //   <div className = "rc-small-titles">
        //     <button className = "rc-rp-button"
        //       onClick = {() => isOpen ? setIsOpen(false) : setIsOpen(true)}>
        //       <AiOutlineStar/>
        //     </button>
        //     <Modal open={isOpen} currentInfo = {currentInfo} product = {product} index = {index} relatedInfo = {relatedInfo}/>
        //     <div className = "rc-rp-details">
        //       <img className = "rc-card-photos" src = {relatedStyles[index] ? relatedStyles[index].results[0].photos[0].thumbnail_url || noPhoto : null}/>
        //       <p>{product.category}</p>
        //       <p className = "rc-card-name">{product.name}</p>
        //       <p>${Math.round(product.default_price)}</p>
        //     </div>
        //   </div>
        // </div>)}
        //   </div>
          )
        })}
         < GrFormNext className = ".rc-rp-next" onClick = {nextCard}/>
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