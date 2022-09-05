import React, { useState } from 'react';
import dateFormat from 'dateformat';

function Answer(props) {
  // const { topTwoAnswers } = props;
  const { filteredAnswers } = props;
  const answers = filteredAnswers;
  // console.log(answers);
  const [maxRange, setMaxRange] = useState(answers.length > 2 ? 2 : answers.length)
  return (
    <div id="qa-QAItem-Answer">
      {
        answers.slice(0, maxRange).map((answer) => {
          if (!answer) {
            return;
          }
          // answerKeys:
          // answerer_name (string)
          // body (string)
          // date (string)
          // helpfulness (number)
          //
          const {
            id, body, answerer_name, date,
          } = answer;
          const formattedDate = dateFormat(date, 'dddd, mmmm dS, yyyy');
          return (
            <div key={id}>
              <p>>{id} {body}</p>
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
      <h3 type='button' onClick={() => {setMaxRange(answers.length)}} >LOAD MORE ANSWERS</h3>
    </div>
  );
}

export default Answer;
