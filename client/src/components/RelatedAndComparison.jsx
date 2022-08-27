import React from 'react';
import axios from 'axios';
import RelatedProducts from './rc/RelatedProducts.jsx'
import YourOutfit from './rc/YourOutfit.jsx'
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
    // .then(res => console.log(res.data))
    .catch(err => console.log('error getting related product IDs: ', err))

  }

  render() {
    return (
      <div>
      <h5 className = "rc-title rc-title1style">Related And Comparison Section:</h5>
      <RelatedProducts relatedProductIDs = {this.state.relatedProductIDs}/>
      <YourOutfit />
      </div>
    )
  }
}

export default RelatedAndComparison;