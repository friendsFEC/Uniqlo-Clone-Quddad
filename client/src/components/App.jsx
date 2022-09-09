import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import QuestionsAndAnswers from './QuestionsAndAnswers';
import RelatedAndComparison from './RelatedAndComparison';
import Overview from './Overview';
import ReviewsAndRatings from './ReviewsAndRatings';
import config from '../../../config';
import { logError } from './rr/utility';
import clickTracker from './clickTracker';

const serverURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/rfp/products';

function ProductIdSlider({ setProductId, productId }) {
  const [products, setProducts] = useState([]);
  useEffect(
    () => axios.get(
      serverURL,
      {
        headers: {
          Authorization: config.API_KEY,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        params: { count: 1000 },
      },
    )
      .then((res) => res.data)
      .then((data) => setProducts(data))
      .catch((err) => logError('Error getting list of products on index.jsx:', err)),
    [],
  );

  useEffect(
    () => {
      const filtered = products.filter((product) => (product.id === productId))[0];
      if (filtered) document.getElementById('slider').value = filtered.id;
    },
    [productId, products],
  );

  return (
    <div style={{ textAlign: 'center' }}>
      <select id="slider" onChange={({ target }) => setProductId(Number(target.value))}>
        {products ? products.map((product) => (
          <option key={product.id} value={product.id}>{product.name}</option>
        )) : null }
      </select>
    </div>
  );
}

ProductIdSlider.propTypes = {
  setProductId: PropTypes.func.isRequired,
  productId: PropTypes.number.isRequired,
};

window.addEventListener('click', clickTracker);

function App() {
  const [productId, setProductId] = useState(65631);
  return (
    <div>
      <div id="border1">
        <div id="border2">
          <ProductIdSlider setProductId={setProductId} productId={productId} />
          {/* <Overview productId={productId} /> */}
          {/* <RelatedAndComparison productID={productId} setProductId={setProductId} /> */}
          <QuestionsAndAnswers product_id={productId} />
          {/* <ReviewsAndRatings productID={productId} /> */}
        </div>
      </div>
    </div>
  );
}

export default App;
