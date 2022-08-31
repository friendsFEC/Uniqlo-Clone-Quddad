import React from 'react';
import ReviewsAndRatings from '../ReviewsAndRatings.jsx';
import {render, screen} from '@testing-library/react';

describe('Reviews and Ratings Tests', () => {
  it('should render 5 star elements on initial load', () => {
    let {container} = render(<ReviewsAndRatings />);
    //await screen.getByText(/Camo Onesie/);
    //screen.findByText(/Camo Onesie/)
    expect(true).toEqual(true);
    expect(container.getElementsByClassName('star').length).toEqual(5)
  });
});
