import React from 'react';
import axios from 'axios';
import config from '../../../../config.js'

class RelatedProductsEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      review: 0
    }
  }

  componentDidMount() {
    axios
    .get('https://app-hrsei-api.herokuapp.com/api/fec2/rfp/reviews?product_id=65631', {
      headers: {
        Authorization: config.API_KEY,
        'Content-Type': 'application/json'
      }
    })
    .then(response => {window.datas = response.data; return response.data})
    .then(data =>
      data.results.reduce((memo, review) => memo + review.rating, 0) / data.count)
      .then(averageReview => this.setState({review: averageReview}))
      .catch(err => console.log('Error fetching data:', err));
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
  //     .then(averageReview => this.setState({review: averageReview}))
  //     .catch(err => console.log('Error fetching data:', err));
  // }


  render() {
    // console.log(this.props.relatedProductIDs)
    // for each product ID, render out the related product card
    return (
      <div>
      </div>
    )
  }
}

export default RelatedProductsEntry;