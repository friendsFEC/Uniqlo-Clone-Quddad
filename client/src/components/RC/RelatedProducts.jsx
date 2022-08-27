import React from 'react';
import axios from 'axios';
import RelatedProductsEntry from './RelatedProductsEntry.jsx'

class RelatedProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    let id = this.props.relatedProductIDs.map(item => item + ' ')
    return (
      <div>
        Related Products: {id}
        <RelatedProductsEntry relatedProductIDs = {this.props.relatedProductIDs}/>
      </div>
    )
  }
}

export default RelatedProducts;

// idea in this file
// here we will get related product IDs
// for each ID, we will render out the card: relatedProductsEntry