import React from 'react';
import ListOfQA from './QA components/ListOfQA.jsx';
import QAEntry from './QA components/QAEntry.jsx';
// import example from './QA components/example.jsx';
import AddQuestions from './QA components/AddQuestions.jsx';

const _V = require('./Utility/V.jsx');

const baseURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/rfp/qa/questions';

class QuestionsAndAnswers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      product: [],
      product_id: '65634',
      productInfo: {},
    };

    this.setProduct = this.setProduct.bind(this);
  }

  componentDidMount() {
    const { product_id } = this.state;
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
          // console.log('parsedData ', parsedData);
          // this.setState(parsedData);
          resolve(parsedData);
        }],
      });
    });

    const getProductInfo = new Promise((resolve, reject) => {
      _V.Axios.get(getProductInfoURL, {
        transformResponse: [(data) => {
          const parsedData = JSON.parse(data) || null;
          // console.log('parsedData ', parsedData);
          // this.setStateInfo(parsedData);
          resolve(parsedData);
        }],
      });
    });
    // _V.Axios.get(getProductQAURL, {
    //   transformResponse: [(data) => {
    //     const parsedData = JSON.parse(data) || null;
    //     this.setState(parsedData);
    //   }],
    // });

    Promise.all([getProductQA, getProductInfo])
      .then((...responses) => {
        console.log('responses ', responses);
        const productQA = responses[0][0];
        const productInfo = responses[0][1];
        this.setProduct(productQA, productInfo);
        // this.setStateInfo(productInfo);
      })
      .catch((errors) => console.warn(errors));
  }

  setProduct(productQA, productInfo) {
    const dataResults = productQA.results;
    this.setState({
      product: dataResults,
      productInfo,
    });
  }

  render() {
    const { product } = this.state;
    const questionList = product;
    const isQuestionFilled = (product.length > 0);
    const { product_id } = this.state;
    const { productInfo } = this.state;

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
          <AddQuestions />
          <QAEntry />
        </div>
      );
    }
    return (
      <div id="qa">
        <p>QUESTIONS & ANSWERS</p>
        <QAEntry />
      </div>
    );
  }
}

export default QuestionsAndAnswers;
