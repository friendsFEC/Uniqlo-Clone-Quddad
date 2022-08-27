import React from 'react';
import axios from 'axios';
import RelatedProducts from './RC/RelatedProducts.jsx'
import YourOutfit from './RC/YourOutfit.jsx'
import config from '../../../config.js'

class RelatedAndComparison extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedProductIDs: [],
    }
  }

  componentDidMount() {
    // get related product IDs of currently selected product (dynamic) e.g. takes in current product ID and uses that in axios.get
    axios
    .get('https://app-hrsei-api.herokuapp.com/api/fec2/rfp/products/65631/related', {
      headers: {
        Authorization: config.API_KEY,
        'Content-Type': 'application/json'
      }
    })
    .then(res => this.setState({relatedProductIDs:res.data}))
    .catch(err => console.log('error getting related product IDs: ', err))

  }

  render() {
    return (
      <div>
      <RelatedProducts relatedProductIDs = {this.state.relatedProductIDs}/>
      <YourOutfit />
      </div>
    )
  }
}

export default RelatedAndComparison;