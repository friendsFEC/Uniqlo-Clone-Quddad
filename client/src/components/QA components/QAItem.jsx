import React from 'react';
import Question from './QAItem/Question.jsx';
import Answer from './QAItem/Answer.jsx';

const _V = require('../Utility/V.jsx');

function QAItem(props) {
  const { questionAnswer } = props;
  const answers = _V.objectToArrayFunction(questionAnswer.answers);
  const filteredAnswers = answers.filter((answer) => answer.helpfulness > 0);
  const topTwoAnswers = _V.topXItems(2, filteredAnswers);

  return (
    <div id="qa-QAItem">
      <h2>Q:</h2>
      <Question
        question_id = {questionAnswer.question_id}
        question_body={questionAnswer.question_body}
        question_helpfulness={questionAnswer.question_helpfulness}
      />
      <h2>A:</h2>
      <Answer topTwoAnswers={topTwoAnswers} />
      <Answer filteredAnswers={filteredAnswers} />

    </div>
  );
}

export default QAItem;
