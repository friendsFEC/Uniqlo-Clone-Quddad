import React, { useState } from 'react';
import dateFormat from 'dateformat';

function Answer(props) {
  // const { topTwoAnswers } = props;
  const { filteredAnswers } = props;
  const answers = filteredAnswers;
  // console.log(answers);
  const [maxRange, setMaxRange] = useState(answers.length > 2 ? 2 : answers.length);
  const [buttonText, setButtonText] = useState('LOAD MORE ANSWERS');

  const answerComponentUpdate = () => {
    // expand the answer list
    // change 'LOAD MORE ANSWERS' to 'COLLAPSE ANSWERS'
    if (buttonText === 'LOAD MORE ANSWERS') {
      // console.log(buttonText);
      setMaxRange(answers.length);
      setButtonText('COLLAPSE ANSWERS');
    } else if (buttonText === 'COLLAPSE ANSWERS') {
      setMaxRange(answers.length > 2 ? 2 : answers.length);
      setButtonText('LOAD MORE ANSWERS');
    }
  };

  return (
    <div id="qa-QAItem-Answer">
      {
        answers.slice(0, maxRange).map((answer) => {
          if (!answer) {
            return;
          }
          const {
            id, body, answerer_name, date,
          } = answer;
          const formattedDate = dateFormat(date, 'dddd, mmmm dS, yyyy');
          return (
            <div key={id}>
              <p>
                <b>Answer</b>
                {' '}
                {body}
              </p>
              <p>
                <small>
                  By
                  {' '}
                  {answerer_name}
                  ,
                  {' '}
                  {formattedDate}
                </small>
              </p>
            </div>
          );
        })
      }

      {answers.length > 2
        ? <h3 type="button" onClick={() => { answerComponentUpdate(); }}>{buttonText}</h3>
        : <h3 />}
    </div>
  );
}

export default Answer;
