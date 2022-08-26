import React from 'react';
import axios from 'axios';
import Test from './rc/test.jsx'
import config from '../../../config.js'

// let RelatedAndComparison = (props) => {
//   return (
//   <div>
//     <h2 className = "rc-title rc-title1style">Related And Comparison Section:</h2>
//     <button className = "rc-button">Normal button</button>
//     <button className = "rc-button rc-button--state-success">Success button</button>
//     <button className = "rc-button rc-button--state-danger">Danger button</button>
//     <h3 className = "rc-title rc-title2style">another title</h3>
//     <Test />
//   </div>
//   )
// }

class RelatedAndComparison extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
    // this.getAverageReview = this.getAverageReview.bind(this);
  }

  componentDidMount() {
    // axios
    // .get(config.API_KEY, {
    //   headers: {
    //     Authorization: '',
    //     'Content-Type': 'application/json'
    //   }
    // })
    // .then(response => {window.datas = response.data; return response.data})
    // .then(data =>
    //   data.results.reduce((memo, review) => memo + review.rating, 0) / data.count)
    //   .then(averageReview => console.log(averageReview))
    //   .catch(err => console.log('Error fetching data:', err));
  }

  // getAverageReview() {
  //   axios
  //   .get(config.API_KEY, {
  //     headers: {
  //       Authorization: '',
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //   .then(response => {window.datas = response.data; return response.data})
  //   .then(data =>
  //     data.results.reduce((memo, review) => memo + review.rating, 0) / data.count)
  //     .then(averageReview => console.log(averageReview))
  //     .catch(err => console.log('Error fetching data:', err));
  // }

  render() {
    return (
      <div>
      <h2 className = "rc-title rc-title1style">Related And Comparison Section:</h2>
      <button className = "rc-button">Normal button</button>
      <button className = "rc-button rc-button--state-success" onClick = {this.getAverageReview}>Success button</button>
      <button className = "rc-button rc-button--state-danger">Danger button</button>
      <h3 className = "rc-title rc-title2style">another title</h3>
      <Test />
      </div>
    )
  }
}

export default RelatedAndComparison;