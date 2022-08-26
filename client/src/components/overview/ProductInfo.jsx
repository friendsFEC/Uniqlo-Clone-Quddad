import React from 'react';
import axios from 'axios';
import config from '../../../../config.js';


class ProductInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {}
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

  render () {
    return (
      <div className="ov-infoBox">
        {this.state.product.name}
      </div>
    )
  }
}



export default ProductInfo;