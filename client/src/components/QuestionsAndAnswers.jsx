import React from 'react';
import Filter from './QA components/Filter.jsx';
import ListOfQA from './QA components/ListOfQA.jsx';
import QAEntry from './QA components/QAEntry.jsx';


class QuestionsAndAnswers extends React.Component {
  constructor(props) {
    super(props);
  }

  //
  componentDidMount() {

  }

  render() {
    return (
      <div id="qa">
        <p>This is James's components</p>
        <Filter />
        <ListOfQA />
        <QAEntry />
      </div>
    )
  }
}

export default QuestionsAndAnswers;
