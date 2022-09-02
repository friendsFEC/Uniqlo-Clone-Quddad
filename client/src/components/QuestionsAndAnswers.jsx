import React from 'react';
import axios from 'axios';
import Filter from './QA components/Filter.jsx';
import ListOfQA from './QA components/ListOfQA.jsx';
import QAEntry from './QA components/QAEntry.jsx';
import example from './QA components/example.jsx';
import config from '../../../config.js'


const baseURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/rfp';
const qaURL = `${baseURL}/qa/questions`;
const Axios = axios.create({
  baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/rfp/',
  headers: {
    Authorization: config.API_KEY,
  },
});

class QuestionsAndAnswers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      product: example.results,
      product_id: '65632',
    };
  }

  componentDidMount() {
    const chosenProductId = `/?product_id=${this.state.product_id}`;
    // Make a request for a user with a given ID

    // Make a request for a user with a given ID
    const get_product_url = qaURL + chosenProductId;
    const result = Axios.get(get_product_url, {
      transformResponse: [(data) => {
        data = JSON.parse(data);
        console.log(data);
      }],
    });
    // axios.get('/user?ID=12345')
    //   .then(function (response) {
    //     // handle success
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     // handle error
    //     console.log(error);
    //   })
    //   .then(function () {
    //     // always executed
    //   });
  }

  render() {
    const isQuestionFilled = (this.state.product.length > 0);

    if (isQuestionFilled) {
      return (
        <div id="qa">
          <p>QUESTIONS & ANSWERS</p>
          <ListOfQA chosenProduct={this.state.product} isQuestionFilled={isQuestionFilled} />
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
