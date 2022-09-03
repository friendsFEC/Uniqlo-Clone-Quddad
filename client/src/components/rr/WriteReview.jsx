import React from 'react';
import PropTypes from 'prop-types';

function WriteReview({ characteristics }) {
  const charData = {
    Size: {
      1: 'A size too small',
      2: '1/2 a size too small',
      3: 'Perfect',
      4: '1/2 a size too big',
      5: 'A size too wide',
    },
    Width: {
      1: 'Too narrow',
      2: 'Slightly narrow',
      3: 'Perfect',
      4: 'Slightly wide',
      5: 'Too wide',
    },
    Comfort: {
      1: 'Uncomfortable',
      2: 'Slightly uncomfortable',
      3: 'Ok',
      4: 'Comfortable',
      5: 'Perfect',
    },
    Quality: {
      1: 'Poor',
      2: 'Below Average',
      3: 'What I expected',
      4: 'Pretty great',
      5: 'Perfect',
    },
    Length: {
      1: 'Runs short',
      2: 'Below average',
      3: 'What I expected',
      4: 'Runs slightly long',
      5: 'Runs long',
    },
    Fit: {
      1: 'Runs tight',
      2: 'Runs slightly tight',
      3: 'Perfect',
      4: 'Runs slightly long',
      5: 'Runs long',
    },
  };
  const keys = Object.keys(charData);
  const parseForm = () => {
    const review = {};
    const reviewItems = [
      'rating', 'recommend', 'summary', 'body', 'photos', 'email', 'reviewer_name',
    ];
    review.date = new Date();
    review.characteristics = {}; // [...keys]
    reviewItems.forEach((key) => {
      review[key] = document.getElementsByName(`rr-review-${key}`)[0].value;
    });
    keys.forEach((key) => {
      const target = document.getElementsByName(`rr-review-${key}`)[0];
      review.characteristics[key] = target ? target.value : '';
    });
    console.log(review);
  };
  return (
    <div className="hidden write-review">
      <div
        className="close"
        style={{ color: 'blue', textDecoration: 'underline' }}
        onClick={() => {
          document.getElementsByClassName('write-review')[0].classList.toggle('hidden');
        }}
      >
        Cancel Review (close)
      </div>
      <h1>Write Review</h1>
      <h2>Overall rating (mandatory)</h2>
      <p
        name="rr-review-rating"
        value="5"
      >
        [interactive stars with highlight-on-hover will go here]
        1 - poor, 2 - fair, 3 - average, 4 - good, 5 - great
      </p>
      <h2>Do you recommend this product? (mandatory)</h2>
      <p>
        <input
          type="radio"
          defaultChecked
          name="rr-review-recommend"
          value="true"
        />
        Yes
      </p>
      <p>
        <input type="radio" name="rr-review-recommend" value="false" />
        No
      </p>
      <h2>Characteristics (mandatory)</h2>
      <table>
        <tbody>
          {keys.map((k) => (
            characteristics && Object.hasOwn(characteristics, k) ? (
              <tr key={k}>
                <td><strong>{k}</strong></td>
                {[1, 2, 3, 4, 5].map((field) => (
                  <td key={field}>
                    {charData[k][field]}
                    <input
                      type="radio"
                      name={`rr-review-${k}`}
                      value={field}
                    />
                  </td>
                ))}
              </tr>
            ) : null
          ))}
        </tbody>
      </table>
      <h2>Review Summary (mandatory)</h2>
      <p>[limit to 60 characters]</p>
      <input type="text" name="rr-review-summary" placeholder="Example: Best purchase ever!" />
      <h2>Review body (mandatory)</h2>
      <p>[minimum 50, max 1000 characters]</p>
      <textarea rows="24" cols="80" name="rr-review-body" />
      <h2>What is your nickname (mandatory)</h2>
      <input type="text" name="rr-review-reviewer_name" placeholder="Example: jackson11!" />
      <h2>Upload your photos</h2>
      <p name='rr-review-photos' value={null}>[this is gonna be tricky]</p>
      <h2>Your email (mandatory)</h2>
      <p>[up to 60 characters]</p>
      <input type="email" name="rr-review-email" placeholder="Example: jackson11@email.com" />
      <p>For authentication reasonse, you will not be emailed.</p>
      <button type="button" onClick={parseForm}>Submit Review</button>
      <p>
        [check that for blank mandatory fields, review body [50, 1000] in length,
        proper email format, and valid images selected]
      </p>
    </div>
  );
}

WriteReview.propTypes = {
  characteristics: PropTypes.shape(
    {
      Fit: PropTypes.shape(
        {
          id: PropTypes.number,
          value: PropTypes.string,
        },
      ),
      Width: PropTypes.shape(
        {
          id: PropTypes.number,
          value: PropTypes.string,
        },
      ),
      Comfort: PropTypes.shape(
        {
          id: PropTypes.number,
          value: PropTypes.string,
        },
      ),
      Quality: PropTypes.shape(
        {
          id: PropTypes.number,
          value: PropTypes.string,
        },
      ),
      Length: PropTypes.shape(
        {
          id: PropTypes.number,
          value: PropTypes.string,
        },
      ),
      Size: PropTypes.shape(
        {
          id: PropTypes.number,
          value: PropTypes.string,
        },
      ),
    },
  ).isRequired,
};

export default WriteReview;
