import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductImage from './overview/ProductImage';
import ProductInfo from './overview/ProductInfo';
import PriceTag from './overview/PriceTag';
import SizeAndQuantity from './overview/SizeAndQuantity';
import config from '../../../config';
import StyleGrid from './overview/StyleGrid';

export default function Overview({ productId }) {
  const [product, setProduct] = useState({});
  const [styles, setStyles] = useState([]);
  const [rating, setRating] = useState(0);
  const [currStyle, setCurrStyle] = useState(0);
  const [extended, toggleView] = useState(false);

  useEffect(() => {
    const one = `/products/${productId}`;
    const two = `/products/${productId}/styles`;
    const three = '/reviews/meta';

    const Axios = axios.create({
      baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/rfp/',
      headers: {
        Authorization: config.API_KEY,
      },
    });

    // gets the producct general info from API and return name, description etc as response data
    const reqProduct = () => (
      Axios.get(one, {
        transformResponse: [(data) => {
          const newData = JSON.parse(data);
          const {
            id, name, category, description, slogan,
          } = newData;
          return {
            id, name, category, description, slogan,
          };
        }],
      })
    );

    // gets styles of a product from api and returns the styles in an array as response data
    const reqStyle = () => (
      Axios.get(two, {
        transformResponse: [(data) => {
          const newData = JSON.parse(data);
          return newData.results;
        }],
      })
    );

    // gets ratings from api and returns average rating as response data
    const reqReview = () => (
      Axios.get(three, {
        params: {
          product_id: productId,
        },
        transformResponse: [(data) => {
          const newData = JSON.parse(data);
          const { ratings } = newData;
          const totalPeople = Object.values(ratings).reduce((prev, curr) => (
            Number(prev) + Number(curr)), 0);
          const totalRating = Object.keys(ratings).reduce((prevKey, currKey) => (
            (prevKey + currKey * ratings[currKey])
          ), 0);
          const avg = totalRating / totalPeople;
          return avg;
        }],
      })
    );

    // making concurrent requests
    Promise.all([reqProduct(), reqStyle(), reqReview()])
      .then((...responses) => {
        const productInfo = responses[0][0].data;
        const stylesInfo = responses[0][1].data;
        const averageRating = responses[0][2].data;
        setProduct(productInfo);
        setStyles(stylesInfo);
        setRating(averageRating);
      })
      .catch((errors) => console.log(errors));
  }, [productId]);

  if (styles.length > 0) {
    return (
      <div className="ov-main">
        <div className="ov-wrapper">
          <ProductImage
            photosData={styles[currStyle].photos}
            toggleView={toggleView}
            extended={extended}
          />
          <div className={extended ? 'noDisplay' : 'ov-infoBox'}>
            <ProductInfo product={product} currStyle={styles[currStyle]} rating={rating}/>
            <div className="ov-title ov-title--Price">
              <PriceTag product={styles[currStyle]} />
            </div>
            <div>
              <StyleGrid changeStyle={setCurrStyle} styleData={styles} active={currStyle} />
            </div>
            <div>
              <SizeAndQuantity sizes={styles[currStyle].skus} />
            </div>
          </div>
        </div>
        <div className="ov-descriptionBlock">
          <h3 className="ov-title">{product.slogan}</h3>
          <p>{product.description}</p>
        </div>
      </div>
    );
  }
  return <div className="ov-imageBox">LOADING...</div>;
}
