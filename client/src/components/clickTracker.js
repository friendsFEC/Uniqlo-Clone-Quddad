import axios from 'axios';
import config from '../../../config';

const IDs = [
  'qa',
];

const classes = [
  'ov-main',
  'rc-main',
  'rr',
];

const serverURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/rfp/interactions';

export default function clickTracker(event) {
  const captureTime = new Date();
  let current = event.target;
  // check if there is an id or class match
  let noMatch = true;
  // if there is no match, the reassign current to current.parentElement
  do {
    const currentClasses = Array(current.classList);
    const classMatchFound = currentClasses.reduce((memo, className) => (
      memo ? true : classes.includes(className[0])
    ), false);
    const IDMatchFound = IDs.includes(current.id);
    noMatch = !(IDMatchFound || classMatchFound);
    if (noMatch) {
      current = current.parentElement;
    }
  } while (noMatch);
  // select product wiget was moved, creating a default value for current
  if (current === null) current = {tagName: 'html', id: null, classList: []};
  // in api call, pass event.target (element), current (module), and time
  let element = event.target;
  element = `<${element.tagName.toLowerCase()} id=${element.id} class=${element.classList} />`;
  const widget = `<${current.tagName.toLowerCase()} id=${current.id} class=${current.classList} />`;
  // console.log({element, widget, time: captureTime});
  axios.post(
    serverURL,
    {
      element,
      widget,
      time: captureTime,
    },
    {
      headers: {
        Authorization: config.API_KEY,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    },
  ).catch((err) => console.error(err));
}
