import React, { useState, useEffect } from 'react';
import Question from './QAItem/Question.jsx';
import Answer from './QAItem/Answer.jsx';

const _V = require('../Utility/V.jsx');

function QAItem(props) {
  const { questionAnswer } = props;
  const { productInfo } = props;
  const answers = _V.objectToArrayFunction(questionAnswer.answers);
  const filteredAnswers = answers.filter((answer) => answer.helpfulness > 0);

  return (
    <div id="qa-QAItem">
      <Question
        question_id={questionAnswer.question_id}
        question_body={questionAnswer.question_body}
        question_helpfulness={questionAnswer.question_helpfulness}
        productInfo={productInfo}
      />
      {/* <Answer topTwoAnswers={topTwoAnswers} /> */}
      <Answer
        filteredAnswers={filteredAnswers}
        productInfo={productInfo}
      />

    </div>
  );
}

export default QAItem;
