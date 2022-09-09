import React, { useState } from 'react';
import dateFormat from 'dateformat';

function Answer(props) {
  // const { topTwoAnswers } = props;
  const { filteredAnswers } = props;
  const answers = filteredAnswers;
  const answersWSeller = answers.filter((answer) => answer.answerer_name === 'Seller');
  const answersWithoutSeller = answers.filter((answer) => answers.answerer_name !== 'Seller');
  // console.log(answers);
  const [maxRange1, setMaxRange1] = useState(answersWSeller.length > 2 ? 2 : answersWSeller.length);
  const [maxRange2, setMaxRange2] = useState(answersWithoutSeller.length > 2 ? 2 : answersWithoutSeller.length);
  const [buttonText, setButtonText] = useState('LOAD MORE ANSWERS');

  const answerComponentUpdate = () => {
    // expand the answer list
    // change 'LOAD MORE ANSWERS' to 'COLLAPSE ANSWERS'
    if (buttonText === 'LOAD MORE ANSWERS') {
      // console.log(buttonText);
      setMaxRange2(answersWithoutSeller.length);
      setButtonText('COLLAPSE ANSWERS');
    } else if (buttonText === 'COLLAPSE ANSWERS') {
      setMaxRange2(answersWithoutSeller.length > 2 ? 2 : answersWithoutSeller.length);
      setButtonText('LOAD MORE ANSWERS');
    }
  };

  return (
    <div id="qa-QAItem-Answer">
      {
        answersWSeller.slice(0, maxRange1).map((answer) => {
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
      {
        answersWithoutSeller.slice(0, maxRange2).map((answer) => {
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

      {answersWithoutSeller.length > 2
        ? (
          <h3
            className="qa-buttonSpecial"
            type="button"
            onClick={() => {
              answerComponentUpdate();
            }}
          >
            {buttonText}
          </h3>
        )
        : <h3 />}
    </div>
  );
}

export default Answer;
