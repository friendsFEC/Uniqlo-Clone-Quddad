import React from 'react';
import App from '../src/components/App.jsx';
import {render, screen} from '@testing-library/react';

describe('example tests', () => {
  it('should pass this test', () => {
    render(<App />);
    expect(true).toEqual(true);
  });
});
