import React from 'react';
import axios from 'axios';
import RelatedProducts from './RC/RelatedProducts.jsx'
import YourOutfit from './RC/YourOutfit.jsx'
import config from '../../../config.js'

class RelatedAndComparison extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedProductInfo: {}
    }
  }

  componentDidMount() {
    // get related productIDs of current product
    axios
      .get('https://app-hrsei-api.herokuapp.com/api/fec2/rfp/products/65631/related', {
        headers: {
          Authorization: config.API_KEY,
          'Content-Type': 'application/json'
        }
      })
      // for each ID, get it's info
      .then(res => {
        res.data.forEach(id => {
          axios
            .get(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/products/${id}`, {
            headers: {
              Authorization: config.API_KEY,
              'Content-Type': 'application/json'
            }
          })
          .then(res => this.setState({relatedProductInfo: res.data}))
          .catch(err => console.log(err))
        })
      })
      .catch(err => console.log('error getting related product IDs & info: ', err))
  }


  render() {
    console.log(this.state.relatedProductInfo)
    return (
      <div>
      <RelatedProducts />
      <YourOutfit />
      </div>
    )
  }
}

export default RelatedAndComparison;