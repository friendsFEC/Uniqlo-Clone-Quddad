import React from 'react';
import Question from './QAItem/Question.jsx';
import Answer from './QAItem/Answer.jsx';

const _V = require('../Utility/V.jsx')

// The questions and their corresponding answers within this list will be displayed
// in an expanding and collapsing accordion. By default, on page load up to four
// questions should be displayed. Up to two answers should display for each
// question. The remaining questions or answers should be hidden until the user
//  loads them using the “More Answered Questions” button (section 1.3.4).


let QAItem = (props) => {
  const questionAnswer = props.questionAnswer;
  const answers = _V.objectToArrayFunction(questionAnswer.answers);
  const filteredAnswers = answers.filter((answer) => answer.helpfulness > 0);
  const topTwoAnswers = _V.topXItems(2, filteredAnswers);
  // console.log(topTwoAnswers);

  return (
    <div id="qa-QAItem">
      <h2>Q:</h2>
      <Question question_body={questionAnswer.question_body} question_helpfulness={questionAnswer.question_helpfulness} />
      <h2>A:</h2>
      <Answer topTwoAnswers={topTwoAnswers} />
    </div>
  )
}

export default QAItem;
