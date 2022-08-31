import React from 'react';
import QAItem from './QAItem.jsx';
import Filter from './Filter.jsx';
const _V = require('../Utility/V.jsx');

let ListOfQA = (props) => {
  const topFourQuestions = _V.topXItems(4, props.chosenProduct);

  // if there are questions in the list
  //  display the list of QAs and question submit
  // else
  //  display question submit
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
