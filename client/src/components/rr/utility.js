/* utility functions */
const errors = [];
export const logError = (msg, err) => {
  errors.push([msg, err]);
};

export const calculateAverage = ({ ratings }, total) => {
  let avg = 0;
  if (ratings) {
    avg = Object.keys(ratings).reduce(
      (sum, key) => sum + (Number(ratings[key]) * key),
      0,
    ) / total;
  }
  return avg;
};

export const calculateTotal = ({ ratings }) => {
  let sum = 0;
  if (ratings) {
    sum = Object.keys(ratings).reduce(
      (memo, key) => memo + Number(ratings[key]),
      0,
    );
  }
  return sum;
};

export const debounce = (fn, interval) => {
  let free = true;
  return (...args) => {
    if (free) {
      free = false;
      setTimeout(() => { free = true; }, interval);
      const result = fn.apply(this, args);
      return result;
    }
    return null;
  };
};

export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  // need to figure out how to configure locale
  return date.toLocaleDateString(
    'en-US',
    { month: 'long', day: 'numeric', year: 'numeric' },
  );
};

export const positionArrowWidgets = ({ characteristics }) => {
  if (characteristics) {
    Object.keys(characteristics).forEach((char, i) => {
      const arrow = document.getElementsByClassName('characteristics-arrow')[i];
      if (arrow) {
        const bar = arrow.parentElement;
        const value = Number(characteristics[char].value);
        const left = ((bar.offsetWidth * value) / 5) - (arrow.width / 2);
        arrow.style.marginLeft = left;
        // console.log('characteristic:', char, '\nvalue:', value, '\nleft:', left);
      }
    });
  }
};

export const setAverage = { type: 'setAverage' };
