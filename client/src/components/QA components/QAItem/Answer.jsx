import React from 'react';
import dateFormat from 'dateFormat';

function Answer(props) {
  const { topTwoAnswers } = props;
  const answers = topTwoAnswers;
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
          const { id, body, answerer_name, date } = answer;
          const formattedDate = dateFormat(date, 'dddd, mmmm dS, yyyy');
          return (
            <div key={id}>
              <p>{body}</p>
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
    </div>
  );
}

export default Answer;
