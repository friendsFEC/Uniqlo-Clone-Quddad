import React from 'react';
import axios from 'axios';
import Filter from './QA components/Filter.jsx';
import ListOfQA from './QA components/ListOfQA.jsx';
import QAEntry from './QA components/QAEntry.jsx';
import example from './QA components/example.jsx';

class QuestionsAndAnswers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      product: example.results,
      product_id: this.props.productId,
    };
  }

  componentDidMount() {
    console.log('product id ', this.state.product_id);

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
