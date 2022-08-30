import React from 'react';
import Filter from './QA components/Filter.jsx';
import ListOfQA from './QA components/ListOfQA.jsx';
import QAEntry from './QA components/QAEntry.jsx';
import axios from 'axios';
import example from './QA components/example.jsx';


// {
//   "question_id": 593041,
//   "question_body": "This is a review for pumped up kicks. Those shoes are great",
//   "question_date": "2022-04-12T00:00:00.000Z",
//   "asker_name": "shan",
//   "question_helpfulness": 9,
//   "reported": false,
//   "answers": {
//       "5539255": {
//           "id": 5539255,
//           "body": "I agree!",
//           "date": "2022-04-15T00:00:00.000Z",
//           "answerer_name": "Javian",
//           "helpfulness": 3,
//           "photos": []
//       },
//       "5539256": {
//           "id": 5539256,
//           "body": "These shoes are too small for my big feet.",
//           "date": "2022-04-15T00:00:00.000Z",
//           "answerer_name": "Eric",
//           "helpfulness": 1,
//           "photos": []
//       },
//   }}

class QuestionsAndAnswers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      product: example.results
    }
  }

  componentDidMount() {
    // console.log(example);

    // console.log('Keys of example.results');
    // for (const key of example.results) {
    //   console.log(key);
    // }
  }



  render() {
    const _QAitem = this.state.product.results
    return (
      <div id="qa">
        <p>This is James's components</p>
        <Filter />
        {<ListOfQA chosenProduct={this.state.product}/>}
        <QAEntry />
      </div>
    )
  }
}

export default QuestionsAndAnswers;
