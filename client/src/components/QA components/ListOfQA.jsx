import React, { useState, useEffect } from 'react';
import QAItem from './QAItem.jsx';
import Filter from './Filter.jsx';
import AddQuestions from './AddQuestions.jsx';

const _V = require('../Utility/V.jsx');

function ListOfQA(props) {
  // const { chosenProduct } = props;
  // console.log('props ', props.chosenProduct);
  const [chosenProduct, setChosenProduct] = useState(props.chosenProduct);
  // const filteredQuestions = chosenProduct
  // .filter((question) => question.question_helpfulness > 0);
  const [filteredQuestions, setFilteredQuestions] = useState(chosenProduct
    .filter((question) => question.question_helpfulness > 0));

  // console.log('props.chosenProduct ', chosenProduct);
  // console.log('filteredQuestions ', filteredQuestions);

  const [QA, setQA] = useState(filteredQuestions);
  const [maxRange, setMaxRange] = useState(filteredQuestions.length > 2
    ? 2 : filteredQuestions.length);
  const [buttonText, setButtonText] = useState('More Answered Questions');

  useEffect(() => {
    setChosenProduct(props.chosenProduct);
    setFilteredQuestions(chosenProduct);
    setQA(filteredQuestions);
    setMaxRange(filteredQuestions.length > 2
      ? 2 : filteredQuestions.length);
  }, [chosenProduct, filteredQuestions, props.chosenProduct]);

  const searchQuestions = (event) => {
    let searchedQuestionsStr = event.target.value;
    searchedQuestionsStr = searchedQuestionsStr.length >= 3 ? searchedQuestionsStr : '';
    const { chosenProduct } = this.props;
    const newChosenProduct = this.filterQuestions(searchedQuestionsStr, chosenProduct);
    setQA(newChosenProduct);
  };

  const filterQuestions = (searchedStr, questions) => {
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
  };

  const questionComponentUpdate = () => {
    // const { buttonText } = this.state;
    // const { chosenProduct } = this.state;
    const text1 = 'More Answered Questions';
    const text2 = 'Less Answered Questions';
    if (buttonText === text1) {
      setMaxRange(QA.length > 4 ? 4 : QA.length);
      setButtonText(text2);
    } else if (buttonText === text2) {
      setMaxRange(QA.length > 2 ? 2 : QA.length);
      setButtonText(text1);
    }
  };

  const { productInfo } = props;

  // console.log('QA ', QA);

  return (
    <div id="qa-ListOfQA">
      {/* <Filter searchQuestions={searchQuestions} /> */}
      {/*
    1. display questions
    2. display answers */}
      <div id="qa-ListOfQA--scrollListOfQuestion">
        {QA.slice(0, maxRange)
          .map((item) =>
            // console.log('item ', item);
            (
              <QAItem
                key={item.question_id}
                questionAnswer={item}
                productInfo={productInfo}
              />
            ))}
      </div>
      <div id="qa-ListOfQA--ListExpandButton--AddAQuestionButton">
        {QAItem.length > 2
          ? (
            <h2
              type="button"
              onClick={() => {
                questionComponentUpdate();
              }}
            >
              {buttonText}
            </h2>
          )
          : <p />}
      </div>
    </div>
  );
}

export default ListOfQA;
