import React from 'react';
import axios from 'axios';
import RelatedProductsEntry from './RelatedProductsEntry.jsx'
import config from '../../../../config.js'

class RelatedProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div>
        <h3 className = "rc-title"> Related Products </h3>
        {this.props.createRPCard()}
      </div>
    )
  }
}

export default RelatedProducts;