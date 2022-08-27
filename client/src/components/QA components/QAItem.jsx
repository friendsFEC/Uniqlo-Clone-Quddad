import React from 'react';

let QAItem = (props) => {
  let questionAnswer = props.questionAnswer;
  // console.log(questionAnswer);
  return (
    <div id="qa-QAItem">
      <h3>Question:</h3>
      <p>{questionAnswer.question_body}</p>
      {/* {console.log('QA Item')} */}
    </div>
  )
}

export default QAItem;
