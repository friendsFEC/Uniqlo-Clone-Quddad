import React, { useState } from 'react';
import QAItem from './QAItem.jsx';
import Filter from './Filter.jsx';

const _V = require('../Utility/V.jsx');

// function ListOfQA(props) {
//   const [chosenProduct, setChosenProduct] = useState(props.chosenProduct);

//   const searchQuestions = (event) => {
//     let searchedQuestionsStr = event.target.value;
//     searchedQuestionsStr = searchedQuestionsStr.length >= 3 ? searchedQuestionsStr : '';
//     const { chosenProduct } = this.props;
//     const newChosenProduct = filterQuestions(searchedQuestionsStr, chosenProduct);
//     this.setState({
//       chosenProduct: newChosenProduct,
//     });
//   };

//   const filterQuestions = (searchedStr, questions) => {
//     searchedStr = searchedStr || '';
//     // if (searchedStr.length < 3) {
//     //   return;
//     // }
//     let results = [];
//     const regExpConst = new RegExp(`${searchedStr}`, 'gi');
//     results = questions.filter((question) => {
//       const questionBody = question.question_body;
//       return questionBody.match(regExpConst) !== null;
//     });
//     return results;
//   };

//   // filter out the questions that are NOT helpful
//   const filteredQuestions = chosenProduct.filter((question) => question.question_helpfulness > 0);

//   // display the first 4 questions
//   const [maxRange, setMaxRange] = useState(filteredQuestions.length > 4 ?
//     4 : filteredQuestions.length);
//   const topFourQuestions = _V.topXItems(4, filteredQuestions);

//   return (
//     <div id="qa-ListOfQA">

//       <Filter searchQuestions={this.searchQuestions} />
//       {/*
//     1. display questions
//     2. display answers */}
//       {topFourQuestions.map((item) => <QAItem key={item.question_id} questionAnswer={item} />)}
//     </div>
//   );
// }

class ListOfQA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenProduct: {},
      maxRange: 0,
    };

    this.searchQuestions = this.searchQuestions.bind(this);
    this.filterQuestions = this.filterQuestions.bind(this);
    this.setMaxRange = this.setMaxRange(this);
  }

  setMaxRange(number) {
    if(!number) {
      return;
    }
    this.setState({
      maxRange: number,
    });
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
    const filteredQuestions = this.state.chosenProduct.filter((question) =>
      question.question_helpfulness > 0);

    // display the first 4 questions
    // const [maxRange, setMaxRange] = useState(filteredQuestions.length > 4
    //   ? 4 : filteredQuestions.length);
    this.setMaxRange(filteredQuestions.length > 4
      ? 4 : filteredQuestions.length);
    // const topFourQuestions = _V.topXItems(4, filteredQuestions);
    const { maxRange } = this.props;

    // rendering DOM
    return (
      <div id="qa-ListOfQA">

        <Filter searchQuestions={this.searchQuestions} />
        {/*
      1. display questions
      2. display answers */}
        {/* {topFourQuestions.map((item) =>
          <QAItem key={item.question_id} questionAnswer={item} />)} */}
        {filteredQuestions.slice(0, maxRange).map((item) =>
          <QAItem key={item.question_id} questionAnswer={item} />)}
      </div>
    );
  }
}
export default ListOfQA;
