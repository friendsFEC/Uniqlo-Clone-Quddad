import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// eslint-disable-next-line import/extensions
import QuestionsAndAnswers from '../../src/components/QuestionsAndAnswers.jsx';

let container;

beforeEach(() => {
  // eslint-disable-next-line react/jsx-filename-extension
  container = render(<QuestionsAndAnswers />).container;
});
