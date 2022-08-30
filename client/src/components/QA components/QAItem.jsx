import React from 'react';
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
      <h3>{questionAnswer.question_body}</h3>
      <h2>A:</h2>
      {/* {
        Object.keys(answers).map((answerKeys) => {
          let answer = answers[answerKeys];
          // answerKeys:
          // answerer_key (string)
          // body (string)
          // date (string)
          // helpfulness (number)
          //
          console.log(answer);
          return (<p key={answer.id}>{answer.body} and helpfulness is </p>);
        })
      } */}
      {
        topTwoAnswers.map((answer) => {
          if (!answer) {
            return;
          }
          // answerKeys:
          // answerer_key (string)
          // body (string)
          // date (string)
          // helpfulness (number)
          //
          return (<p key={answer.id}>{answer.body}</p>);
        })
      }
    </div>
  )
}

export default QAItem;
