import React, {useState, useEffect} from 'react'
import QuestionsAndAnswers from './QuestionsAndAnswers.jsx';
import RelatedAndComparison from './RelatedAndComparison.jsx';
import Overview from './Overview.jsx';
import ReviewsAndRatings from './ReviewsAndRatings.jsx';
import axios from 'axios';
import config from '../../../config.js';

const serverURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/rfp/products';


let ProductIdSlider = (props) => {
  let [products, setProducts] = useState([]);
  useEffect(() =>
    axios.get(serverURL, {
      headers: {
        Authorization: config.API_KEY,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      params: { count: 1000 }
    })
    .then(res => res.data)
    .then(data => setProducts(data))
    .catch(err => console.log('Error getting list of products on index.jsx:', err)),
    []
  );

  return (
    <div style={{textAlign: 'center'}}>
      <select onChange={({target}) => props.setProductId(target.value)}>
        {products ? products.map((product, i) => 
        <option key={i} value={product.id}>{product.name}</option>
        ) : null}
      </select>
    </div>
  )
}

let App = (props) => {
  let [productId, setProductId] = useState(65631);
  return (
    <div>
      <ProductIdSlider setProductId={setProductId} />
      <Overview productId={productId}/>
      <RelatedAndComparison productId={productId}/>
      <QuestionsAndAnswers productId={productId}/>
      <ReviewsAndRatings productId={productId}/>
    </div>
  )
}

export default App;

