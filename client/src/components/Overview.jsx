import React from 'react';
import ProductImage from './overview/ProductImage.jsx';
import ProductInfo from './overview/ProductInfo.jsx';
import axios from 'axios';
import config from '../../../config.js';


class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      styles: []
    }
  }

  componentDidMount() {
    this.fetch();
  }

  fetch() {
    axios.get('/products/65631', {
      baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/rfp/',
      headers: {
        'Authorization': config.API_KEY
      }
    }).then((res) => (this.setState({product: res.data})));
  }

  render() {
    return (
      <div>
        <div className="ov-wrapper">
          <ProductImage />
          <ProductInfo product={this.state.product}/>
        </div>
        <div className="ov-descriptionBlock">
          <h3>{this.state.product.slogan}</h3>
          <p>{this.state.product.description}</p>
        </div>
      </div>
    )
  }
}



export default Overview;