import React from 'react';
import axios from 'axios';
import RelatedProducts from './RC/RelatedProducts.jsx'
import YourOutfit from './RC/YourOutfit.jsx'
import config from '../../../config.js'
import { AiOutlineStar } from 'react-icons/ai';
import Modal from './RC/Modal.jsx'

class RelatedAndComparison extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedProductInfo: [],
      relatedProductStyles: [],
      defaultProductStyles: [],
      review: 0,
      modalStatus: false
    }
    this.createRPCard = this.createRPCard.bind(this);
    this.getImage = this.getImage.bind(this);
    this.handleModal = this.handleModal.bind(this);
    // this.getReview = this.getReview.bind(this);
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
      // for each ID, get it's info and store it in state
      .then(res => {
        const dataStorage = [];
        const styleStorage = [];
        res.data.forEach(id => {
          axios
            .get(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/products/${id}`, {
            headers: {
              Authorization: config.API_KEY,
              'Content-Type': 'application/json'
            }
          })
          .then(res => dataStorage.push(res.data))
          .then(() => this.setState({relatedProductInfo:dataStorage}))
          .catch(err => console.log(err))
        })
        res.data.forEach(id => {
          axios
            .get(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/products/${id}/styles`, {
              headers: {
                Authorization: config.API_KEY,
                'Content-Type': 'application/json'
              }
            })
            // .then(res => console.log(res.data))
            .then(res => styleStorage.push(res.data.results))
            .then(() => this.setState({relatedProductStyles:styleStorage}))
            .then(() => {
              const defaultProducts = [];
              for (let i = 0; i < this.state.relatedProductStyles.length; i++) {
                for (let j = 0; j < this.state.relatedProductStyles.length; j++) {
                  if (this.state.relatedProductStyles[i][j]["default?"]) {
                    defaultProducts.push(this.state.relatedProductStyles[i][j])
                  }
                }
              }
              this.setState({defaultProductStyles: defaultProducts})
            })
            .catch(err => console.log(err))
        })
      })
      .catch(err => console.log('error getting related product IDs & info: ', err))
  }

  // handleModal(e) {
  //   e.preventDefault()
  //   this.setState({modalStatus: true})
  //   console.log('working')
  //   if (!this.state.modalStatus) return null
  //   return (
  //     <Modal></Modal>
  //   )
  // }

  createRPCard() {
    return (
      <div>
      {this.state.relatedProductInfo.map(product => {
        return <div className = "rc-main" key = {product.id}>
          {/* {this.getImage()} */}
          <div className = "rc-small-titles">
          <button className = "rc-rp-button" onClick = {this.handleModal}><AiOutlineStar/></button>
          {/* <Modal modalStatus={this.state.modalStatus}></Modal> */}
          <p>{product.category}</p>
          <p>{product.name}</p>
          <p>{product.default_price}</p>
          {/* <div>{this.getReview(product.id)}</div> */}
          </div>
        </div>
      })}
    </div>
    )
  }

  getImage() {
    return (
      this.state.defaultProductStyles.map(style => {
        return <div>hey</div>
      })
    )
  }

  // getReview(id) {
  //   return axios
  //   .get(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/reviews?product_id=${id}`, {
  //     headers: {
  //       Authorization: config.API_KEY,
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //   .then(response => {window.datas = response.data; return response.data})
  //   .then(data =>
  //     data.results.reduce((memo, review) => memo + review.rating, 0) / data.count)
  //     .then(averageReview => <div>{averageReview}</div>)
  //     .catch(err => console.log('Error fetching data:', err));
  // }


  render() {
    // console.log('relatedProductInfo:', this.state.relatedProductInfo)
    // console.log('relatedProductStyles: ', this.state.relatedProductStyles)
    // console.log('defaultProductStyles: ', this.state.defaultProductStyles)
    return (
      <div>
      <RelatedProducts
        createRPCard = {this.createRPCard}
      />
      <YourOutfit />
      </div>
    )
  }
}

export default RelatedAndComparison;