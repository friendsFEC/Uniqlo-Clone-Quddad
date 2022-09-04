import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { submitReview } from './api';
import StarRating from './StarRating';

function WriteReview({ characteristics, productID }) {
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
  const ratingMap = {
    1: 'Poor',
    2: 'Fair',
    3: 'Average',
    4: 'Good',
    5: 'Great',
  };
  const keys = Object.keys(charData);
  const [fixes, setFixes] = useState([]);
  const [overallRating, setOverallRating] = useState(0);
	const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
  const parseForm = () => {
    const review = {};
    const reviewItems = [
      'recommend', 'summary', 'body', 'photos', 'email', 'name',
    ];
    review.product_id = productID;
    review.rating = overallRating;
    review.characteristics = {}; // [...keys]
    reviewItems.forEach((key) => {
      review[key] = document.getElementsByName(`rr-review-${key}`)[0].value;
    });
    keys.forEach((key) => {
			const targets = document.getElementsByName(`rr-review-${key}`);
			if (targets.length) {
				targets.forEach(radioBtn => {
					if (radioBtn.checked) {
						review.characteristics[key] = radioBtn.value;
					}
				});
			}
    });
    // validate the data
		const validateData = () => {
			let makeChanges = [];
			if (review.rating === 0) {
				makeChanges.push('Select an overall rating!');
			}
			// review.recommend defaults to true
			keys.forEach((key) => {
				if (Object.hasOwn(characteristics, key)) {
					if (review.characteristics[key] === undefined) {
						makeChanges.push(`Choose a value for the ${key} characteristic!`);
					}
				}
			});
			// review summary is not mandatory
			if (review.body.length < 50) {
				makeChanges.push('Please adjust the length of your review body message!');
			}
			if (!emailRegex.test(review.email)) {
				makeChanges.push('Please format your email address properly!');
			}
      // validate photos are proper format
      const inputs = Array.from(document.getElementsByClassName('photo-upload'));
      const uploads = inputs.map((input) => input.files[0] ).filter((file) => file !== undefined);
      console.log(uploads);
			return makeChanges;
		}
		setFixes(validateData())
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
      <h1>Write Your Review</h1>
      <h2>Overall rating (mandatory)</h2>
        <div
        onClick={({ target }) => {
          // console.log(target);
          let value = 0;
          let current = target;
          while (current !== null) {
            value += 1;
            current = current.previousSibling;
          }
          setOverallRating(value);
        }}
      >
          <p>
            <StarRating rating={overallRating} />
            {`${overallRating}: ${ratingMap[overallRating]}`}
          </p>
      </div>
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
                      key={field}
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
      <h2>Review Summary</h2>
      <p>[limit to 60 characters]</p>
      <input maxLength="60" type="text" name="rr-review-summary" placeholder="Example: Best purchase ever!" />
      <h2>Review body (mandatory)</h2>
      <p>[minimum 50, max 1000 characters]</p>
      <textarea minLength="50" maxLength="1000" rows="24" cols="80" name="rr-review-body" />
      <h2>What is your nickname (mandatory)</h2>
      <input type="text" name="rr-review-name" placeholder="Example: jackson11!" />
      <h2>Upload your photos</h2>
      {[0, 1, 2, 3, 4].map((i) => (
        <input
          key={i}
          type="file"
          name="rr-review-photos"
          className={i === 0 ? 'photo-upload first-photo' : 'hidden photo-upload'}
          onChange={({ target }) => {
            // get all upload inputs that have a file
            let uploads = Array.from(document.getElementsByClassName('photo-upload'));
            const fileCount = uploads.reduce((cnt, input) => cnt + input.files.length, 0);
            // reveal (1) additional button
            //let uploads = uploads.filter((input) => !input.classList.contains('first-photo'));
            uploads[fileCount].classList.toggle('hidden');
          }}
        />
      ))}
      <h2>Your email (mandatory)</h2>
      <p>[up to 60 characters]</p>
      <input type="email" maxLength="60" name="rr-review-email" placeholder="Example: jackson11@email.com" />
      <p>For authentication reasonse, you will not be emailed.</p>
      <button type="button" onClick={parseForm}>Submit Review</button>
      <p>
        [check that for blank mandatory fields, review body [50, 1000] in length,
        proper email format, and valid images selected]
      </p>
      { fixes.length ? (
        <div>
          <h2>Please fix the following before submitting!</h2>
          <ul>
            {fixes.map((fix) => <li>{fix}</li>)}
          </ul>
        </div>
      ) : null }
    </div>
  );
}

WriteReview.propTypes = {
  productID: PropTypes.number.isRequired,
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
  ),
};

WriteReview.defaultProps = {
  characteristics: {},
};

export default WriteReview;
