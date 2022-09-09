import React, { useState, useEffect } from 'react';
import Question from './QAItem/Question.jsx';
import Answer from './QAItem/Answer.jsx';

const _V = require('../Utility/V.jsx');

function QAItem(props) {
  const { questionAnswer } = props;
  const { productName } = props;
  const answers = _V.objectToArrayFunction(questionAnswer.answers);
  const filteredAnswers = answers.filter((answer) => answer.helpfulness > 0);
  // const filteredAnswers = answers;
  // const topTwoAnswers = _V.topXItems(2, filteredAnswers);

  return (
    <div id="qa-QAItem">
      <Question
        question_id={questionAnswer.question_id}
        question_body={questionAnswer.question_body}
        question_helpfulness={questionAnswer.question_helpfulness}
      />
      {/* <Answer topTwoAnswers={topTwoAnswers} /> */}
      <Answer filteredAnswers={filteredAnswers} />

    </div>
  );
}

export default QAItem;
