import React from 'react';
import QAItem from './QAItem.jsx';
import Filter from './Filter.jsx';
const _V = require('../Utility/V.jsx');

class ListOfQA extends React.Component {
  constructor(props) {
    super(props);

    this.searchQuestions = this.searchQuestions.bind(this);
  }

  searchQuestions(event) {
    console.log(event.target.value);
  }

  render() {
    const filteredQuestions = this.props.chosenProduct.filter((question) =>
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
