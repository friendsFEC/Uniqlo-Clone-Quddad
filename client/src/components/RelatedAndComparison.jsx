import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import RelatedProducts from './RC/RelatedProducts.jsx'
import YourOutfit from './RC/YourOutfit.jsx'
import config from '../../../config.js'
import { AiOutlineStar } from 'react-icons/ai';
import Modal from './RC/Modal.jsx'

const RelatedAndComparison = () => {
  const [RPInfo, setRPInfo] = useState([]);
  const [RPStyles, setRPStyles] = useState([]);
  const [DPStyles, setDPStyles] = useState([]);

  const getRelatedInfo = () => {
    axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/rfp/products/65631/related', {
      headers: {
        Authorization: config.API_KEY,
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      const dataStorage = [];
      const styleStorage = [];
      res.data.forEach(id => {
        axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/products/${id}`, {
          headers: {
            Authorization: config.API_KEY,
            'Content-Type': 'application/json'
          }
        })
        .then(res => dataStorage.push(res.data))
        .then(() => setRPInfo(dataStorage))
        .catch(err => console.log(err))
      })
      res.data.forEach(id => {
        axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/products/${id}/styles`, {
          headers: {
              Authorization: config.API_KEY,
              'Content-Type': 'application/json'
          }
        })
        .then(res => styleStorage.push(res.data.results))
        .then(() => setRPStyles(styleStorage))
        .then(() => {
          const defaultProducts = [];
          for (let i = 0; i < RPStyles.length; i++) {
            for (let j = 0; j < RPStyles.length; j++) {
              if (RPStyles[i][j]["default?"]) {
                defaultProducts.push(RPStyles[i][j]);
              }
            }
          }
        setDPStyles(defaultProducts);
        })
        .catch(err => console.log(err))
      })
    })
    .catch(err => console.log(err))
  }

  useEffect(() => {
    getRelatedInfo()
  }, [])

  return (
    <div>
    <RelatedProducts RPInfo = {RPInfo}/>
    <YourOutfit />
    </div>
  )
}

export default RelatedAndComparison;