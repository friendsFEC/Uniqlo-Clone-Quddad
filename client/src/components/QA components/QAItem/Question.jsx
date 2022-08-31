import React from 'react';

let Question = (props) => {

  return (
    <div id="qa-QAItem-Question">
      <h3>{props.question_body} | Helpful? Yes ({props.question_helpfulness})    |    Add an answer</h3>
    </div>
  )
}

export default Question;
