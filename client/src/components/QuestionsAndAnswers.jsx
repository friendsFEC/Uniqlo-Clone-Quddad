import React, { useState, useEffect } from 'react';
import ListOfQA from './QA components/ListOfQA.jsx';
import QAEntry from './QA components/QAEntry.jsx';
// import example from './QA components/example.jsx';
import AddQuestions from './QA components/AddQuestions.jsx';

const _V = require('./Utility/V.jsx');

const baseURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/rfp/qa/questions';

function QuestionsAndAnswers({ product_id }) {
  const [product, setProduct] = useState([]);
  const [productInfo, setProductInfo] = useState({});

  useEffect(() => {
    // get the product
    const chosenProductId = `/?product_id=${product_id}`;
    const getProductQAURL = baseURL + chosenProductId;

    // get product info
    const baseURL2 = 'https://app-hrsei-api.herokuapp.com/api/fec2/rfp/products/';
    const getProductInfoURL = baseURL2 + product_id;

    const getProductQA = new Promise((resolve, reject) => {
      _V.Axios.get(getProductQAURL, {
        transformResponse: [(data) => {
          const parsedData = JSON.parse(data) || null;
          resolve(parsedData);
        }],
      });
    });

    const getProductInfo = new Promise((resolve, reject) => {
      _V.Axios.get(getProductInfoURL, {
        transformResponse: [(data) => {
          const parsedData = JSON.parse(data) || null;
          resolve(parsedData);
        }],
      });
    });

    Promise.all([getProductQA, getProductInfo])
      .then((...responses) => {
        const productQA = responses[0][0];
        const productInfo = responses[0][1];
        updateData(productQA, productInfo);
      })
      .catch((errors) => console.warn(errors));
  }, [product_id]);

  let updateData = (productQA, productInfo) => {
    const dataResults = productQA.results;
    setProduct(dataResults);
    setProductInfo(productInfo);
  };

  const questionList = product;
  const isQuestionFilled = (product.length > 0);
  // this.getData();
  // console.log('product_id ', product_id);
  // console.log('product ', product);

  if (isQuestionFilled) {
    return (
      <div id="qa">
        <p>QUESTIONS & ANSWERS</p>
        <ListOfQA
          chosenProduct={questionList}
          isQuestionFilled={isQuestionFilled}
          productId={product_id}
          productInfo={productInfo}
        />
        <AddQuestions
          productInfo={productInfo}
        />
        <QAEntry />
      </div>
    );
  }
  return (
    <div id="qa">
      <p>QUESTIONS & ANSWERS</p>
      <AddQuestions
        productInfo={productInfo}
      />
    </div>
  );
}

export default QuestionsAndAnswers;
