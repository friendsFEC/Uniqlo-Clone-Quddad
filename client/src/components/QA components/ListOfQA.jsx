import React from 'react';
import QAItem from './QAItem.jsx';
import Filter from './Filter.jsx';
const _V = require('../Utility/V.jsx');

class ListOfQA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenProduct: this.props.chosenProduct
    }

    this.searchQuestions   = this.searchQuestions.bind(this);
    this.filteredQuestions = this.filterQuestions.bind(this);
  }

  searchQuestions(event) {
    const searchedQuestions = event.target.value;
    const newChosenProduct  = this.filterQuestions(searchedQuestions, this.props.chosenProduct);
    this.setState({
      chosenProduct: newChosenProduct
    })
  }

  filterQuestions(searchedStr, questions) {
    searchedStr = searchedStr || '';
    let results = [];
    const regExpConst = new RegExp(`${searchedStr}`, 'gi');
    results = questions.filter((question) => {
      const questionBody = question.question_body;
      return questionBody.match(regExpConst) !== null;
    })
    return results;
  }

  render() {
    // filter out the questions that are NOT helpful
    const filteredQuestions = this.state.chosenProduct.filter((question) =>
      question.question_helpfulness > 0
    );

    // display the first 4 questions
    const topFourQuestions = _V.topXItems(4, filteredQuestions);

    // rendering DOM
    return (
      <div id="qa-ListOfQA">

      <Filter searchQuestions={this.searchQuestions}/>
      {/*
      1. display questions
      2. display answers */}
      {topFourQuestions.map((item) => {
        return <QAItem key={item.question_id} questionAnswer={item} />
      })}
      </div>
    )
  };

}
export default ListOfQA;
