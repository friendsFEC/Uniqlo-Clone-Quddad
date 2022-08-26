import React from 'react';
import axios from 'axios';

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: 0
    }
  }

  // componentDidMount() {
  //   axios
  //     .get('https://app-hrsei-api.herokuapp.com/api/fec2/rfp/reviews?product_id=65631', {
  //       headers: {
  //         Authorization: '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',
  //         'Content-Type': 'application/json'
  //       }
  //     })
  //     .then(response => {window.datas = response.data; return response.data})
  //     .then(data =>
  //       data.response.reduce((memo, review) => memo + review.rating, 0) / data.count)
  //       .then(averageReview => console.log(averageReview))
  //       .catch(err => console.log('Error fetching data:', err));
  // }

  render() {
    return (
      <div>testing working</div>
    )
  }
}

export default Test;