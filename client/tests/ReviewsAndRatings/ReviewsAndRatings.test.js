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
  it('should load 2 reviews', async () => {
    // not sure if this simulates waiting for page to load
    let loaded = 0;
    new Promise(() => setTimeout(() => 
      loaded = container.getElementsByClassName('review-tile').length,
      2000
    )).then(expect(loaded).toBeGreaterThan(0))
  });
});
