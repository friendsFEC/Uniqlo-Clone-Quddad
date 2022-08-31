import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import RelatedProducts from './RC/RelatedProducts.jsx'
import YourOutfit from './RC/YourOutfit.jsx'
import config from '../../../config.js'
import { AiOutlineStar } from 'react-icons/ai';

const RelatedAndComparison = () => {
  const [currentInfo, setCurrentInfo] = useState([]);
  const [relatedIDs, setRelatedIDs] = useState([]);
  // const [RPInfo, setRPInfo] = useState([]);
  // const [RPStyles, setRPStyles] = useState([]);

  const productID = 65631;

  useEffect(() => {
    let one = `/products/${productID}`
    let two = `/products/${productID}/related`

    const Axios = axios.create({
      baseURL: `https://app-hrsei-api.herokuapp.com/api/fec2/rfp/`,
      headers: {
        'Authorization': config.API_KEY
      }
    });

    const getCurrentInfo = () => {
      return Axios.get(one, {
        transformResponse: [(data) => {
          data = JSON.parse(data);
          return data;
        }]
      })
    }

    const getRelatedIDs = () => {
      return Axios.get(two, {
        transformResponse: [(data) => {
          data = JSON.parse(data);
          return data;
        }]
      })
    }

    Promise.all([getCurrentInfo(), getRelatedIDs()])
      .then((...responses) => {
        const currentInfo = responses[0][0].data;
        const relatedIDs = responses[0][1].data;
        setCurrentInfo(currentInfo);
        setRelatedIDs(relatedIDs);
      })
      .catch(errors => console.log(errors))
  }, [])

  useEffect(() => {
    relatedIDs.map(id => {
      let one = `/products/${id}`
      let two = `/products/${id}/styles`

      const Axios = axios.create({
        baseURL: `https://app-hrsei-api.herokuapp.com/api/fec2/rfp/`,
        headers: {
          'Authorization': config.API_KEY
        }
      })

      const getRelatedInfo = () => {
        return Axios.get(one, {
          transformResponse: [(data) => {
            data = JSON.parse(data);
            return data;
          }]
        })
      }

      const getRelatedStyles = () => {
        return Axios.get(two, {
          transformResponse: [(data) => {
            data = JSON.parse(data);
            return data;
          }]
        })
      }

      Promise.all([getRelatedInfo, getRelatedStyles])
      .then((...responses) => {
        console.log(responses)
      })
    })
  })

  // const getCurrentInfo = () => {
  //   axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/products/65631`, {
  //     headers: {
  //       Authorization: config.API_KEY,
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //   .then(res => setCurrentInfo(res.data))
  //   .catch(err => console.log(err))
  // }

  // // refactor using axios.all or promises
  // const getRelatedInfo = () => {
  //   axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/rfp/products/65631/related', {
  //     headers: {
  //       Authorization: config.API_KEY,
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //   .then(res => {
  //     const dataStorage = [];
  //     const styleStorage = [];

  //     //Gets Related Product Info by ID
  //     res.data.forEach(id => {
  //       axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/products/${id}`, {
  //         headers: {
  //           Authorization: config.API_KEY,
  //           'Content-Type': 'application/json'
  //         }
  //       })
  //       .then(res => dataStorage.push(res.data))
  //       .then(() => setRPInfo(dataStorage))
  //       .catch(err => console.log(err))
  //     })

  //     // Gets style information for each related product by ID
  //     res.data.forEach(id => {
  //       axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/products/${id}/styles`, {
  //         headers: {
  //             Authorization: config.API_KEY,
  //             'Content-Type': 'application/json'
  //         }
  //       })
  //       .then(res => styleStorage.push(res.data.results))
  //       // .then(res => console.log(res.data))
  //       .then(() => setRPStyles(styleStorage))
  //       .catch(err => console.log(err))
  //     })
  //   })
  //   .catch(err => console.log(err))
  // }


  // useEffect(() => {
  //   getRelatedInfo()
  // }, [])

  // useEffect(() => {
  //   getCurrentInfo()
  // }, [])

  //   return (
  //     <div>
  //     <RelatedProducts
  //       currentInfo = {currentInfo}
  //       RPInfo = {RPInfo}
  //       RPStyles = {RPStyles}
  //     />
  //     <YourOutfit />
  //     </div>
  //   )
  // } else {
    return (<div>LOADING</div>)

}

export default RelatedAndComparison;