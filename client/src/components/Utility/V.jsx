const axios = require('axios');
// const config = require('../../config.js');


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
  numberOfItems = (numberOfItems > array.length) ? array.length : numberOfItems;

  for (let index = 0; index < numberOfItems; index += 1) {
    resultArr.push(array[index]);
  }
  return resultArr;
};

// const baseURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/rfp';
// const qaURL = `${baseURL}/qa/questions`;

// module.exports.Axios = axios.create({
//   baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/rfp/',
//   headers: {
//     Authorization: config.API_KEY,
//   },
// });