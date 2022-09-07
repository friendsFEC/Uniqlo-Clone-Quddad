import React from 'react';
import ListOfQA from './QA components/ListOfQA.jsx';
import QAEntry from './QA components/QAEntry.jsx';
// import example from './QA components/example.jsx';

const _V = require('./Utility/V.jsx');

const baseURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/rfp/qa/questions';

class QuestionsAndAnswers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      product: [],
      product_id: '65634',
    };

    this.updateData = this.updateData.bind(this);
  }

  componentDidMount() {
    const { product_id } = this.state;
    const chosenProductId = `/?product_id=${product_id}`;
    // Make a request for a user with a given ID

    // Make a request for a user with a given ID
    const getProductURL = baseURL + chosenProductId;
    // get the product

    _V.Axios.get(getProductURL, {
      transformResponse: [(data) => {
        const parsedData = JSON.parse(data) || null;
        this.updateData(parsedData);
      }],
    });
  }

  updateData(data) {
    const dataResults = data.results;
    this.setState({
      product: dataResults,
    });
  }

  render() {
    const { product } = this.state;
    const isQuestionFilled = (product.length > 0);
    if (isQuestionFilled) {
      return (
        <div id="qa">
          <p>QUESTIONS & ANSWERS</p>
          <ListOfQA chosenProduct={product} isQuestionFilled={isQuestionFilled} />
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
