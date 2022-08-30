import React from 'react';
import QAItem from './QAItem.jsx';
const _V = require('../Utility/V.jsx');

let ListOfQA = (props) => {
  const topFourQuestions = _V.topXItems(4, props.chosenProduct);
  return (
    <div id="qa-ListOfQA">
    {/*
    1. display questions
    2. display answers */}
    {topFourQuestions.map((item) => {
      return <QAItem key={item.question_id} questionAnswer={item} />
    })}
    </div>
  )
};

export default ListOfQA;
