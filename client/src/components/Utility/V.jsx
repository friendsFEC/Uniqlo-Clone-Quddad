module.exports.objectToArrayFunction = (obj) => {
  let array = [];
  for (const key in obj) {
    array.push(obj[key]);
  }

  return array;
};

module.exports.topXItems = (numberOfItems, array) => {
  let resultArr = [];
  // if the num of items > array.length, adjust the length
  numberOfItems = (numberOfItems > array.length) ? array.length : numberOfItems;

  for (let index = 0; index < numberOfItems; index++) {
    resultArr.push(array[index]);
  }
  return resultArr;
}