import React from 'react';

// The questions and their corresponding answers within this list will be displayed
// in an expanding and collapsing accordion. By default, on page load up to four
// questions should be displayed. Up to two answers should display for each
// question. The remaining questions or answers should be hidden until the user
//  loads them using the “More Answered Questions” button (section 1.3.4).


let Question = (props) => {

  return (
    <div id="qa-QAItem-Question">
      <h3>{props.question_body} | Helpful? Yes ({props.question_helpfulness})    |    Add an answer</h3>
    </div>
  )
}

export default Question;
