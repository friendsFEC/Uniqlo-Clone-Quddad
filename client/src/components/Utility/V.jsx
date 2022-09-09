const axios = require('axios');
const config = require('../../../../config.js');

const Axios = axios.create({
  baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/rfp/qa/questions',
  headers: {
    Authorization: config.API_KEY,
  },
});

// const getProductOverview = () => {
//   let product = {};
//   Axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/rfp/products/65634', {
//     transformResponse: [(data) => {
//       const parsedData = JSON.parse(data) || null;
//       product = parsedData;
//     }],
//   });
//   return product;
// };

module.exports.objectToArrayFunction = (obj) => {
  const array = [];
  for (const key in obj) {
    array.push(obj[key]);
  }

  return array;
};

module.exports.topXItems = (numberOfItems, array) => {
  const resultArr = [];
  // if the num of items > array.length, adjust the length
  const temp = (numberOfItems > array.length) ? array.length : numberOfItems;

  for (let index = 0; index < temp; index += 1) {
    resultArr.push(array[index]);
  }
  return resultArr;
};

module.exports.Axios = Axios;

// _V.Axios.get(getProductURL, {
//   transformResponse: [(data) => {
//     const parsedData = JSON.parse(data) || null;
//     this.updateData(parsedData);
//   }],
// });

// module.exports.Axios2 = () => {
//   console.log('hello');
// };

// Axios.get(getProductURL, {
//   transformResponse: [(data) => {
//     const parsedData = JSON.parse(data) || null;
//     this.updateData(parsedData);
//   }],
// });
