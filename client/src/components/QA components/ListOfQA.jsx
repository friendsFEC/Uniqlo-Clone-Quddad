import React from 'react';
import QAItem from './QAItem.jsx';
import Filter from './Filter.jsx';

const _V = require('../Utility/V.jsx');

class ListOfQA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenProduct: this.props.chosenProduct,
    };

    this.searchQuestions = this.searchQuestions.bind(this);
    this.filterQuestions = this.filterQuestions.bind(this);
  }

  searchQuestions(event) {
    let searchedQuestionsStr = event.target.value;
    searchedQuestionsStr = searchedQuestionsStr.length >= 3 ? searchedQuestionsStr : '';
    const { chosenProduct } = this.props;
    const newChosenProduct = this.filterQuestions(searchedQuestionsStr, chosenProduct);
    this.setState({
      chosenProduct: newChosenProduct,
    });
  }

  filterQuestions(searchedStr, questions) {
    searchedStr = searchedStr || '';
    // if (searchedStr.length < 3) {
    //   return;
    // }
    let results = [];
    const regExpConst = new RegExp(`${searchedStr}`, 'gi');
    results = questions.filter((question) => {
      const questionBody = question.question_body;
      return questionBody.match(regExpConst) !== null;
    });
    return results;
  }

  render() {
    // filter out the questions that are NOT helpful
    const filteredQuestions = this.state.chosenProduct.filter((question) => question.question_helpfulness > 0);

    // display the first 4 questions
    const topFourQuestions = _V.topXItems(4, filteredQuestions);

    // rendering DOM
    return (
      <div id="qa-ListOfQA">

        <Filter searchQuestions={this.searchQuestions} />
        {/*
      1. display questions
      2. display answers */}
        {topFourQuestions.map((item) => <QAItem key={item.question_id} questionAnswer={item} />)}
      </div>
    );
  }
}
export default ListOfQA;
