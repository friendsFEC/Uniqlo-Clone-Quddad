import React from 'react';
import axios from 'axios';

class RelatedProductsEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  // getAverageReview() {
  //   axios
  //   .get('https://app-hrsei-api.herokuapp.com/api/fec2/rfp/reviews?product_id=65631', {
  //     headers: {
  //       Authorization: config.API_KEY,
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
    // console.log(this.props.id)
    return (
      <div>render each related product here</div>
    )
  }
}

export default RelatedProductsEntry;