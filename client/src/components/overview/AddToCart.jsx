import React from 'react';
import axios from 'axios';
import config from '../../../../config';

export default function AddToCart({ sizeId, count }) {
  const Axios = axios.create({
    baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/rfp/',
    headers: {
      Authorization: config.API_KEY,
    },
  });

  // Axios.post('/cart', { sku_id: sizeId })

  console.log(count);
  const handleClick = () => {
    const reqs = [];
    const Count = Number(count);
    Array(Count).map(() => reqs.push(5));
    console.log(reqs);
    // Promise.all(reqs)
    //   .then((response) => console.log(...response[0]))
    //   .catch((errors) => console.log(errors));
  };

  return (
    <button
      type="button"
      onClick={handleClick}
    >
      cart
    </button>
  );
}
