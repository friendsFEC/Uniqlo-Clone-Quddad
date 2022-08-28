import React from 'react';
import axios from 'axios';
import RelatedProductsEntry from './RelatedProductsEntry.jsx'
import config from '../../../../config.js'

class RelatedProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // card1: [request 1]
      card1: [],
      card2: [],
      card3: [],
      card4: []
    }
  }
  // return array of requests, use promiseAll and set state for each request
  render() {
    // const id = this.props.relatedProductIDs.map(item =>  item + ' ')
    // const relatedProductsCount = this.props.relatedProductIDs.length;
    // for each related product ID, we will render out it's individual card


    // // this gets name, category, default price
    // const test = this.props.relatedProductIDs.map(id => {
    //   return axios
    //     .get(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/products/${id}`, {
    //       headers: {
    //         Authorization: config.API_KEY,
    //         'Content-Type': 'application/json'
    //       }
    //     })
    //     .then(res => console.log(res.data))
    //     .catch(err => console.log('error in test:', err))
    // })
    // Promise.all([test])
      // .then(res => console.log(res))


    return (
      <div>
        <h3>Related Products:</h3>
        <RelatedProductsEntry/>
      </div>
    )
  }
}

export default RelatedProducts;

// idea in this file
// here we will get related product IDs
// for each ID, we will render out the card: relatedProductsEntry