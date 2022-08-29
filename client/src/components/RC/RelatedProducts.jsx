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
        <h3 className = "rc-title">Related Products</h3>
        {this.props.relatedProductInfo.map(product => {
          return <div className = "rc-main" key = {product.id}>
            <p>{JSON.stringify(product.category)}</p>
            <p>{JSON.stringify(product.name)}</p>
            <p>{JSON.stringify(product.default_price)}</p>
            </div>
        })}
        <RelatedProductsEntry/>
      </div>
    )
  }
}

export default RelatedProducts;