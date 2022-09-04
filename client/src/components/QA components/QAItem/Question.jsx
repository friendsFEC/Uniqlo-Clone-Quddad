import React, { useState, useEffect } from 'react';

const _V = require('../../Utility/V.jsx');

let isHelpfulClicked = false;

function Question(props) {
  // declare variables
  const { question_id, question_body, question_helpfulness } = props;
  const [questionHelpfulness, setQuestionHelpfulness] = useState(question_helpfulness);

  // update/increment the helpfulness of a question
  const handleHelpfulness = (e) => {
    setQuestionHelpfulness((questionHelpfulness) => {
      if (!isHelpfulClicked) {
        const link = `/${question_id}/helpful`;
        _V.Axios.put(link)
          .then(() => {
          })
          .catch(() => {
            console.warn('Put NO works');
          });
        isHelpfulClicked = true;
        questionHelpfulness += 1;
      }

      // if successful, increment the questionHelpfulness
      return questionHelpfulness;
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
      <button type="button" onClick={() => handleHelpfulness()}>
        Yes
        {' '}
        {/* { question_helpfulness } */}
        { questionHelpfulness }
      </button>
      <h3>
        Add an answer
      </h3>
    </div>
  );
}

export default Question;
