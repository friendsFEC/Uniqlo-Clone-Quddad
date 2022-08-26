import React from 'react';
import QAItem from './QaItem.jsx';

let ListOfQA = (props) => {
  return (
    <div id="qa-ListOfQA">
    {/*
    1. display questions
    2. display answers */}
    {props.chosenProduct.map((item) => {
      console.log('item ', item);
      return <QAItem key={item.question_id} />
    })}
    </div>
  )
};

export default ListOfQA;
