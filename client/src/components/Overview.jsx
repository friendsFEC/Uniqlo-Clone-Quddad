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
      styles: [],
      rating: 0
    }
  }

  componentDidMount() {
    this.fetch();
  }

  fetch() {
    let one ='/products/65631';
    let two = '/products/65631/styles';
    let three = '/reviews/meta';

    const Axios = axios.create({
      baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/rfp/',
      headers: {
        'Authorization': config.API_KEY
      }
    });

    // gets the producct general info from API and return name, description etc as response data
    const reqProduct = () => {
      return Axios.get(one, {
        transformResponse: [(data) => {
          data = JSON.parse(data);
          let { id, name, category, description, slogan } = data;
          return { id, name, category, description, slogan };
        }]
      })
    };

    //gets styles of a product from api and returns the styles in an array as response data
    const reqStyle = () => {
      return Axios.get(two, {
        transformResponse: [(data) => {
          data = JSON.parse(data);
          return data.results;
        }]
      })
    };

    //gets ratings from api and returns average rating as response data
    const reqReview = () => {
      return Axios.get(three, {
        params: {
          product_id: 65631
        },
        transformResponse: [(data) => {
          data = JSON.parse(data);
          let ratings = data.ratings;
          let totalPeople = Object.values(ratings).reduce((prev, curr) => prev + curr );
          let totalRating = Object.keys(ratings).reduce((prevKey, currKey) => {
            return (prevKey + currKey * ratings[currKey]);
          }, 0)
          let avg = totalRating / totalPeople;
          return avg;
        }]
      })
    }

    // making concurrent requests
    Promise.all([reqProduct(), reqStyle(), reqReview()])
      .then((...responses) => {
          const productInfo = responses[0][0].data;
          const styles = responses[0][1].data;
          const averageRating = responses[0][2].data;
          this.setState({product: productInfo, styles: styles, rating: averageRating})
        }
      ).catch(errors => console.log(errors));
  }

  render() {
    if (this.state.styles.length > 0) {
      return (
        <div className="ov-main">
          <div className="ov-wrapper">
            <ProductImage style={this.state.styles[0]}/>
            <ProductInfo product={this.state.product}/>
          </div>
          <div className="ov-descriptionBlock">
            <h3>{this.state.product.slogan}</h3>
            <p>{this.state.product.description}</p>
          </div>
        </div>
      )
    } else {
      return  <div className="ov-imageBox">LOADING...</div>
    }
  }
}



export default Overview;