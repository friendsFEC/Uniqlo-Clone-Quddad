import React from 'react';
import ReviewsAndRatings from '../../src/components/ReviewsAndRatings.jsx';
import {render, screen, within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

var container; 

beforeEach(() => {
  container = render(<ReviewsAndRatings />).container;
})

describe('Reviews and Ratings Tests', () => {
  describe('review-list and review-tile', () => {
    it('should render 5 star elements on initial load', () => {
      //await screen.getByText(/Camo Onesie/);
      //screen.findByText(/Camo Onesie/)
      expect(true).toEqual(true);
      expect(container.getElementsByClassName('star').length).toEqual(5)
    });
    it('should load at least 2 reviews', async () => {
      let loaded = -1;
      new Promise(() => {
        setTimeout(() => 
        loaded = container.getElementsByClassName('review-tile').length,
        1000
        )
        return loaded
      }).then(loaded => expect(loaded).toBeGreaterThan(1))
    });
    it('should load more reviews when the right button is clicked', () => {
      let user = userEvent.setup();
      let loaded = -1;
      let moreLoaded = -1;
      new Promise(() => {
        setTimeout(() => 
        loaded = container.getElementsByClassName('review-tile').length,
        1000
        )
        return loaded
      }).then(loaded => expect(loaded).toBeGreaterThan(1))
      user.click(screen.getByRole('button', {name: /More Reviews/}));

      new Promise(() => {
        setTimeout(() => 
        moreLoaded = container.getElementsByClassName('review-tile').length,
        1000
        )
        return moreLoaded
      }).then(moreLoaded => expect(moreLoaded).toBeGreaterThan(loaded))
    });
  });
  describe('search box', () => {
    it('should filter items based on text search', async () => {
      //userEvent.setup();
      expect(screen.getByRole(/search/).value).toEqual('');
      //await userEvent.change(screen.getByRole(/search/), );

    });
  });
});
