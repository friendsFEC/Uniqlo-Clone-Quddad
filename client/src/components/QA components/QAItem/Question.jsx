import React, { useState, useEffect } from 'react';

const _V = require('../../Utility/V.jsx');

function Question(props) {
  // declare variables
  const { question_id, question_body, question_helpfulness } = props;
  const [questionHelpfulness, setQuestionHelpfulness] = useState(question_helpfulness);
  const [isHelpfulClicked, setIsHelpfulClicked] = useState(false);
  const [isReported, setIsReported] = useState(false);

  // update/increment the helpfulness of a question
  const handleHelpfulness = () => {
    setQuestionHelpfulness((questionHelpfulness) => {
      if (!isHelpfulClicked) {
        const link = `/${question_id}/helpful`;
        _V.Axios.put(link)
          .then(() => {
            setIsHelpfulClicked(true);
          })
          .catch(() => {
            questionHelpfulness -= 1;
          });
        // setIsHelpfulClicked(true);
        questionHelpfulness += 1;
      }

      // if successful, increment the questionHelpfulness
      return questionHelpfulness;
    });
  };

  const handleReport = () => {
    setIsReported((isReported) => {
      if (!isHelpfulClicked) {
        const link = `/${question_id}/report`;
        _V.Axios.put(link)
          .then(() => {
            // do nothing
            console.log('Reported');
          })
          .catch(() => {
            console.warn('Report PUT not working');
          });
        // setIsHelpfulClicked(true);
        isReported = true;
      }

      // if successful, increment the questionHelpfulness
      return isReported;
    });
  };

  return (
    <div id="qa-QAItem-Question">
      <h3>
        { question_body }
        {' '}
      </h3>
      <h3>
        | Helpful?
      </h3>
      {/* <button type="button" onClick={() => setQuestionHelpfulness(questionHelpfulness)}> */}
      <button type="button" onClick={() => handleHelpfulness()}>
        Yes
        {' '}
        {/* { question_helpfulness } */}
        { questionHelpfulness }
      </button>
      <button
        type="button"
        onClick={() => {
          handleReport();
        }}
      >
        Report
      </button>
      <h3>
        Add an answer
      </h3>
    </div>
  );
}

export default Question;
