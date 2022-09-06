import React, { useState } from 'react';
import QAItem from './QAItem.jsx';
import Filter from './Filter.jsx';
import AddQuestions from './AddQuestions.jsx';

const _V = require('../Utility/V.jsx');

class ListOfQA extends React.Component {
  constructor(props) {
    super(props);
    console.log('props ', props);
    const { chosenProduct } = this.props;
    const filteredQuestions = chosenProduct
      .filter((question) => question.question_helpfulness > 0);

    const currentMaxRange = filteredQuestions.length > 2
      ? 2 : filteredQuestions.length;
    this.state = {
      chosenProduct: filteredQuestions,
      maxRange: currentMaxRange,
      buttonText: 'More Answered Questions',
    };

    this.searchQuestions = this.searchQuestions.bind(this);
    this.filterQuestions = this.filterQuestions.bind(this);
    this.questionComponentUpdate = this.questionComponentUpdate.bind(this);
  }

  // Clicking the button will cause up to 2 additional questions to
  // appear. The list should expand, and the questions should show in
  // order below the previously loaded questions.
  questionComponentUpdate() {
    const { buttonText } = this.state;
    const { chosenProduct } = this.state;
    const text1 = 'More Answered Questions';
    const text2 = 'Less Answered Questions';
    if (buttonText === text1) {
      this.setState({
        maxRange: chosenProduct.length > 4 ? 4 : chosenProduct.length,
        buttonText: text2,
      });
    } else if (buttonText === text2) {
      this.setState({
        maxRange: chosenProduct.length > 2 ? 2 : chosenProduct.length,
        buttonText: text1,
      });
    }
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
    const { chosenProduct } = this.state;
    const { maxRange } = this.state;
    const { buttonText } = this.state;

    return (
      <div id="qa-ListOfQA">

        <Filter searchQuestions={this.searchQuestions} />
        {/*
      1. display questions
      2. display answers */}
        <div id="qa-ListOfQA--scrollListOfQuestion">
          {chosenProduct.slice(0, maxRange).map((item) => <QAItem key={item.question_id} questionAnswer={item} />)}
        </div>
        <div id="qa-ListOfQA--ListExpandButton--AddAQuestionButton">
          {chosenProduct.length > 2
            ? (
              <h2
                type="button"
                onClick={() => {
                  this.questionComponentUpdate();
                }}
              >
                {buttonText}
              </h2>
            )
            : <p />}
          <AddQuestions />
        </div>

      </div>
    );
  }
}
export default ListOfQA;
