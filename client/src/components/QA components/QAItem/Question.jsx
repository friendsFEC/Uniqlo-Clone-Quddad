import React, { useState, useEffect } from 'react';
import AddAnswersModal from '../Modals/AddAnswersModal.jsx';

const _V = require('../../Utility/V.jsx');

function Question(props) {
  // declare variables
  const { question_id, question_body, question_helpfulness } = props;
  const [questionHelpfulness, setQuestionHelpfulness] = useState(question_helpfulness);
  const [isHelpfulClicked, setIsHelpfulClicked] = useState(false);
  const [isReported, setIsReported] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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
            console.warn('Reported');
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
    <div className="qa-QAItem-Question">
      <h3>
        Question:
        {' '}
        { question_body }
        {' '}
      </h3>
      <div className="qa-QAItem-Question rightHandSide">
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
        <button className="qa-astext" type="button" onClick={() => setIsOpen(true)}><h2>Add Answer</h2></button>
        <AddAnswersModal open={isOpen} onClose={() => setIsOpen(false)}>
          <h2>Submit your answer</h2>
          <h3>
            PRODUCT NAME:
            {' '}
            { question_body }
          </h3>
        </AddAnswersModal>
      </div>

    </div>
  );
}

export default Question;
