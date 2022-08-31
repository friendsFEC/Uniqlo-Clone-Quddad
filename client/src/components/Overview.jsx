import React from 'react';
import { useState, useEffect } from 'react';
import ProductImage from './overview/ProductImage.jsx';
import ProductInfo from './overview/ProductInfo.jsx';
import axios from 'axios';
import config from '../../../config.js';



const Overview = () => {
  const [product, setProduct] = useState({});
  const [styles, setStyles] = useState([]);
  const [rating, setRating] = useState(0);
  const [currStyle, setCurrStyle] = useState(0);

  const productId = 65631

  useEffect(() => {
    let one =`/products/${productId}`;
    let two = `/products/${productId}/styles`;
    let three = '/reviews/meta';

    const Axios = axios.create({
      baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/rfp/',
      headers: {
        'Authorization': config.API_KEY
      }
    });

    // // gets all the products from the api
    // const reqAllProducts = () => {
    //   return Axios.get('products/', {
    //     transformResponse: [(data) => {
    //       data = JSON.parse(data);
    //       let { id, name } = data;
    //       return { id , name };
    //     }]
    //   })
    // }

    // gets the producct general info from API and return name, description etc as response data
    const reqProduct = () => {
      return Axios.get(one, {
        transformResponse: [(data) => {
          data = JSON.parse(data);
          let { id, name, category, description, slogan } = data;
          return { id, name, category, description, slogan };
        }]
      })
    };

    //gets styles of a product from api and returns the styles in an array as response data
    const reqStyle = () => {
      return Axios.get(two, {
        transformResponse: [(data) => {
          data = JSON.parse(data);
          return data.results;
        }]
      })
    };

    //gets ratings from api and returns average rating as response data
    const reqReview = () => {
      return Axios.get(three, {
        params: {
          product_id: productId
        },
        transformResponse: [(data) => {
          data = JSON.parse(data);
          let ratings = data.ratings;
          let totalPeople = Object.values(ratings).reduce((prev, curr) => (
            Number(prev) + Number(curr)), 0);
          let totalRating = Object.keys(ratings).reduce((prevKey, currKey) => {
            return (prevKey + currKey * ratings[currKey]);
          }, 0)
          let avg = totalRating / totalPeople;
          return avg;
        }]
      })
    }

    // making concurrent requests
    Promise.all([reqProduct(), reqStyle(), reqReview()])
      .then((...responses) => {
          const productInfo = responses[0][0].data;
          const styles = responses[0][1].data;
          const averageRating = responses[0][2].data;
          setProduct(productInfo);
          setStyles(styles);
          setRating(averageRating)
        })
        .catch(errors => console.log(errors));

  }, []);

    const selectStyle = (idx) => {
      setCurrStyle(idx);
    }

    if (styles.length > 0) {
      return (
        <div className="ov-main">
          <div className="ov-wrapper">
            <ProductImage photosData={styles[currStyle].photos}/>
            <ProductInfo product={product} rating={rating}/>
          </div>
          <div className="ov-descriptionBlock">
            <h3>{product.slogan}</h3>
            <p>{product.description}</p>
          </div>
        </div>
      )
    } else {
      return  <div className="ov-imageBox">LOADING...</div>
    }
}


export default Overview;