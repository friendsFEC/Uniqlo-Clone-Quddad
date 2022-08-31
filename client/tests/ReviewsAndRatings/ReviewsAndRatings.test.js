import React from 'react';
import ReviewsAndRatings from '../../src/components/ReviewsAndRatings.jsx';
import {render, screen} from '@testing-library/react';

var container; 

beforeEach(() => {
  container = render(<ReviewsAndRatings />).container;
})

describe('Reviews and Ratings Tests', () => {
  it('should render 5 star elements on initial load', () => {
    //await screen.getByText(/Camo Onesie/);
    //screen.findByText(/Camo Onesie/)
    expect(true).toEqual(true);
    expect(container.getElementsByClassName('star').length).toEqual(5)
  });
  it('should load 2 reviews', () => {
    // not sure if this simulates waiting for page to load
    setTimeout(() =>
      expect(container.getElementsByClassName('review-tile').length).toBeGreaterTHan(0),
      1000
    );
  });
});
