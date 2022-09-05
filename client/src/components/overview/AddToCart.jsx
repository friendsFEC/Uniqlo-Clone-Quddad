import PropTypes from 'prop-types';
import React, { useState } from 'react';
import axios from 'axios';
import Alert from './Alert.jsx';
import config from '../../../../config';

export default function AddToCart({ sizeId, count }) {
  const [success, trigger] = useState(false);

  const Axios = axios.create({
    baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/rfp/',
    headers: {
      Authorization: config.API_KEY,
    },
  });

  // Axios.post('/cart', { sku_id: sizeId })
  // function req() { return Axios.post('/cart', { sku_id: sizeId }); }

  const handleClick = () => {
    const promises = [];
    const Count = Number(count);
    for (let i = 0; i < Count; i += 1) {
      promises.push(Axios.post('/cart', { sku_id: sizeId }));
    }
    Promise.all(promises)
      .then(() => trigger(true))
      .catch((errors) => console.log(errors));
  };

  return (
    <div>
      {!success
        && (
        <button
          type="button"
          onClick={handleClick}
        >
          Add To Cart
        </button>
        )}
      <Alert show={success} trigger={trigger} />
    </div>
  );
}

AddToCart.propTypes = {
  sizeId: PropTypes.string.isRequired,
  count: PropTypes.string.isRequired,
};
