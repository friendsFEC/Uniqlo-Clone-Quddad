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
    results = questions.filter((question) => {
      // console.log(question.question_body.search(searchedStr));
      return question.question_body.search(searchedStr) > -1;
    }
    )
    // console.log(results);

    return results;
  }

  render() {
    const filteredQuestions = this.state.chosenProduct.filter((question) =>
      question.question_helpfulness > 0
    );
    const topFourQuestions = _V.topXItems(4, filteredQuestions);

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
