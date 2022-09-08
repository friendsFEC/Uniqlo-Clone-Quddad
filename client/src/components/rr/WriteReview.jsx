import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { submitReview } from './api';
import StarRating from './StarRating';
import config from '../../../../config';
import { postImage } from './api';
import { debounce } from './utility';
import { AiFillCloseSquare } from 'react-icons/ai';
import { IconContext } from 'react-icons';

// https://api.cloudinary.com/v1_1/${cloudName}/upload

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
  const [imageUploads, setImageUploads] = useState([]);
  const [parsedReview, setParsedReview] = useState({});
  let [loaded, setLoaded] = useState(false); // keep from posting when page loads
  const [reviewSent, setReviewSent] = useState(false);
  const parseForm = () => {
    const review = {};
    const reviewItems = [
      'summary', 'body', 'email', 'name',
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
						review.characteristics[characteristics[key].id] = Number(radioBtn.value);
					}
				});
			}
    });
    const recommends = Array.from(document.getElementsByName('rr-review-recommend'))
    review.recommend = JSON.parse(recommends.filter((rec) => rec.checked)[0].value);
    // validate the data
		const validateData = () => {
			let makeChanges = [];
			if (review.rating === 0) {
				makeChanges.push('Select an overall rating!');
			}
			// review.recommend defaults to true
			keys.forEach((key) => {
				if (Object.hasOwn(characteristics, key)) {
					if (review.characteristics[characteristics[key].id] === undefined) {
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
      setImageUploads(inputs.map((input) => input.files[0] ).filter((file) => file !== undefined));
      setParsedReview(review);
			return makeChanges;
		}
		setFixes(validateData())
  };
  useEffect(() => {
    // console.log('post hook is running\n, loaded:', loaded);
    if (fixes.length === 0 && loaded) {
      // console.log(`no fixes and page has loaded ${loaded} times`);
      Promise.all(imageUploads.map((img) => postImage(img)))
        .then((resArray) => resArray.map((res) => res.data.url))
        .then((photoURLs) => ({...parsedReview, photos: photoURLs}))
        .then((review) => {
            if (!reviewSent) {
              submitReview(review);
              setReviewSent(true);
            }
          })
          .then((res) => {
            document.getElementsByClassName('write-review')[0].classList.toggle('hidden');
            let btn = document.getElementById('rr-write-review-btn');
            btn.parentElement.removeChild(btn);
          })
          .catch((err) => console.log(err));
    }
    setLoaded(true);
    // console.log('loaded after run', loaded);
  }, [fixes]);

  const [cards, setCards] = useState(['rr-form-first', 'rr-form-second', 'rr-form-third', 'rr-form-fourth', 'rr-form-fifth', 'rr-form-sixth', 'rr-form-last']);
  // recommend, characteristics, overall, nickname+email, summary + body, photos (done)
  const [currentCard, setCurrentCard] = useState('rr-form-first');
  const nextCard = () => {
    const target = cards.reduce((index, card, i) => card === currentCard ? i : index, -1) + 1;
    setCurrentCard(cards[target]);
  }
  const previousCard = () => {
    let target = cards.reduce((index, card, i) => card === currentCard ? i : index, -1) - 1;
    target = target < 0 ? 0 : target;
    setCurrentCard(cards[target]);
  }
  useEffect(() => {
    console.log(currentCard);
    const container = document.getElementsByClassName('rr-container')[0];
    const cardsDiv = document.getElementById('rr-form-cards');
    let target = cards.reduce((index, card, i) => card === currentCard ? i : index, -1);
    // const left = Number(cardsDiv.style.left.replace(/px/, '')) - (loaded ? container.offsetWidth : 0);
    const left = container.offsetWidth * (-target);
    console.log('left:', left)
    cardsDiv.style.left = left;
  }, [currentCard])

  const positionCards = () => {
    const container = document.getElementsByClassName('rr-container')[0];
    const cards = document.getElementById('rr-form-cards');
    const header = document.getElementById('rr-form-title');
    const footer = document.getElementById('rr-form-footer');
    console.log(cards.children);
    console.log(container);
    cards.style.width = container.offsetWidth * cards.childElementCount;
    Array.from(cards.children).map((child) => {
      child.style.width = container.offsetWidth;
    });
    cards.style.left = 0;
  };

  useEffect(() => {
    positionCards();
  }, [])
  window.addEventListener('resize', positionCards);

  return (
    <div className="hidden write-review">
      <div className="rr-wrapper">
        <div className="rr-container">
          <div
            className="close"
            onClick={() => {
              document.getElementsByClassName('write-review')[0].classList.toggle('hidden');
            }}
          >
            <IconContext.Provider value={{ size: '2rem' }} >
              <AiFillCloseSquare />
            </IconContext.Provider>
          </div>
          <div id="rr-form-title">
            <h1>Write Your Review</h1>
          </div>
          <div id="rr-form-cards">
            <div id="rr-form-first">
              <div className="rr-form-container">
                <h1>Do you recommend this product? (mandatory)</h1>
                  <input
                    type="radio"
                    defaultChecked
                    name="rr-review-recommend"
                    value={true}
                    textcontent="Yes"
                  />
                  <input type="radio" name="rr-review-recommend" value="false" />
                  No
              </div>
            </div>
            <div id="rr-form-second">
              <div className="rr-form-container">
                <h1>Characteristics (mandatory)</h1>
                {keys.map((k) => (
                  characteristics && Object.hasOwn(characteristics, k) ? (
                    <div key={k}>
                      <p><strong>{k}</strong></p>
                      {[1, 2, 3, 4, 5].map((field) => (
                        <span key={field}>
                          {charData[k][field]}
                          <input
                            key={field}
                            type="radio"
                            name={`rr-review-${k}`}
                            value={field}
                          />
                        </span>
                      ))}
                    </div>
                  ) : null
                ))}
              </div>
            </div>
            <div id="rr-form-third">
              <div className="rr-form-container">
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
                    {overallRating !== 0 ? `${overallRating}: ${ratingMap[overallRating]}` : null}
                  </p>
                </div>
              </div>
            </div>
            <div id="rr-form-fourth">
              <div className="rr-form-container">
                <h2>What is your nickname (mandatory)</h2>
                <input type="text" name="rr-review-name" placeholder="Example: jackson11!" />
                <h2>Your email (mandatory)</h2>
                <p>[up to 60 characters]</p>
                <input type="email" maxLength="60" name="rr-review-email" placeholder="Example: jackson11@email.com" />
                <p>For authentication reasonse, you will not be emailed.</p>
              </div>
            </div>
            <div id="rr-form-fifth">
              <div className="rr-form-container">
                <h2>Review Summary</h2>
                <p>[limit to 60 characters]</p>
                <input maxLength="60" type="text" name="rr-review-summary" placeholder="Example: Best purchase ever!" />
                <h2>Review body (mandatory)</h2>
                <p>[minimum 50, max 1000 characters]</p>
                <textarea minLength="50" maxLength="1000" rows="24" cols="80" name="rr-review-body" />
              </div>
            </div>
            <div id="rr-form-sixth">
              <div className="rr-form-container">
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
              </div>
            </div>
            <div id="rr-form-last">
              <div className="rr-form-container">
                <p>
                  [check that for blank mandatory fields, review body [50, 1000] in length,
                  proper email format, and valid images selected]
                </p>
                { fixes.length ? (
                  <div>
                    <h2>Please fix the following before submitting!</h2>
                    <ul>
                      {fixes.map((fix, i) => <li key={i}>{fix}</li>)}
                    </ul>
                  </div>
                ) : null }
              </div>
            </div>
          </div>
          <div id="rr-form-footer">
            <button type="button" onClick={previousCard}>Previous Section</button>
            {currentCard === 'rr-form-last' ?
                (<button type="button" style={{backgroundColor: '#000', color: '#fff'}} onClick={parseForm}>Submit Review</button>)
              : (<button type="button" onClick={nextCard}>I'm done with this section</button>)
            }
          </div>
        </div>
      </div>
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
