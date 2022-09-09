import axios from 'axios';
import config from '../../../../config';
import { logError } from './utility';

const serverURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/rfp/reviews';
const imageServerURL = `https://api.cloudinary.com/v1_1/${config.CLOUD_NAME}/image/upload`;

export const postImage = (file) => {
  let formData = new FormData();
  formData.append('upload_preset', config.UPLOAD_PRESET);
  formData.append('file', file);
  formData.append('api_key', config.CLOUDINARY_API_KEY);
  return axios({
    method: 'post',
    url: imageServerURL,
    data: formData,
  })
};

export const getReviewsMeta = (productID) => (
  axios.get(`${serverURL}/meta`, {
    headers: {
      Authorization: config.API_KEY,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    params: {
      product_id: productID,
    },
  })
    .then((response) => response.data)
    .catch((err) => logError('Error getting review meta data:', err))
);

export const getReviews = (productID, pg = 1, cnt = 2, srt = 'relevant') => (
  axios.get(serverURL, {
    headers: {
      Authorization: config.API_KEY,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    params: {
      product_id: productID,
      page: pg,
      count: cnt,
      sort: srt,
    },
  })
    .then((response) => response.data)
    .then((data) => data) // this is what gets 'returned'
    .catch((err) => logError('Error getting review data:', err))
);

export const reportReview = (reviewID) => axios.put(
  `${serverURL}/${reviewID}/report`,
  {},
  {
    headers: {
      Authorization: config.API_KEY,
      'Access-Control-Allow-Origin': '*',
    },
  },
).catch((err) => logError('Error reporting a review:', err));

export const markHelpful = (reviewID) => axios.put(
  `${serverURL}/${reviewID}/helpful`,
  {},
  {
    headers: {
      Authorization: config.API_KEY,
      'Access-Control-Allow-Origin': '*',
    },
  },
)
  .then((res) => res)
  .catch((err) => logError('Error marking review as helpful:', err));
export const submitReview = (data) => (
  axios.post(
    serverURL, 
    data,
    {
      headers: {
        Authorization: config.API_KEY,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    },
  )
);
