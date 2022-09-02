import React from 'react';

let Answer = (props) => {
  let answers = props.topTwoAnswers;


  return (
    <div id="qa-QAItem-Answer">
      {
        answers.map((answer) => {
          if (!answer) {
            return;
          }
          // answerKeys:
          // answerer_name (string)
          // body (string)
          // date (string)
          // helpfulness (number)
          //
          return (
          <div key={answer.id}>
            <p>{answer.body}</p>
            <p><small>By {answer.answerer_name}, {answer.date}</small></p>
          </div>);
        })
      }
    </div>
  )
}

export default Answer;
