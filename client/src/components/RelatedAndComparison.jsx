import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import RelatedProducts from './RC/RelatedProducts.jsx'
import YourOutfit from './RC/YourOutfit.jsx'
import config from '../../../config.js'
import { AiOutlineStar } from 'react-icons/ai';

const RelatedAndComparison = () => {
  const [currentInfo, setCurrentInfo] = useState([]);
  const [RPInfo, setRPInfo] = useState([]);
  const [RPStyles, setRPStyles] = useState([]);
  const [DPStyles, setDPStyles] = useState([]);
  const [notDPStyles, setNotDPStyles] = useState([]);

  const getCurrentInfo = () => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/products/65631`, {
      headers: {
        Authorization: config.API_KEY,
        'Content-Type': 'application/json'
      }
    })
    .then(res => setCurrentInfo(res.data))
    .catch(err => console.log(err))
  }

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
          const notDefaultProducts = [];
          for (let i = 0; i < styleStorage.length; i++) {
            for (let j = 0; j < styleStorage.length; j++) {
              if (styleStorage[i][j]["default?"]) {
                defaultProducts.push(styleStorage[i][j]);
              } else {
                notDefaultProducts.push(styleStorage[i][j]);
              }
            }
          }
          setDPStyles(defaultProducts);
          setNotDPStyles(notDefaultProducts);
        })
        .catch(err => console.log(err))
      })
    })
    .catch(err => console.log(err))
  }

  useEffect(() => {
    getRelatedInfo()
  }, [])

  useEffect(() => {
    getCurrentInfo()
  }, [])

  return (
    <div>
    <RelatedProducts currentInfo = {currentInfo} RPInfo = {RPInfo} RPStyles = {RPStyles} DPStyles = {DPStyles} notDPStyles = {notDPStyles}/>
    <YourOutfit />
    </div>
  )
}

export default RelatedAndComparison;