import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import config from '../../../config.js';

const serverURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/rfp/reviews';



let ReviewsAndRatings = (props) => {
  /* hooks */
  //const [productID, setProductID] = useState(props.productId || 65631);
  const productID = props.productId;
  const setProductID = props.setProductId;
  const [reviews, setReviews] = useState([]);
  const [meta, setMeta] = useState({});
  const [average, setAverage] = useState(0);
  const [total, setTotal] = useState(0);
  const [sort, setSort] = useState('relevant');
  const [more, setMore] = useState(true);
  const [search, setSearch] = useState('');
  const [ratingFilter, setRatingFilter] = useState([]);
  const [helpfulReviews, setHelpfulReviews] = useState([]);
  const count = 2;

  /* utility functions */
  const calculateAverage = () => {
    let average = 0;
    if (meta.ratings) {
      let sum = 0;
      for (let k in meta.ratings) {
        sum += (parseInt(meta.ratings[k]) * k);
      }
      //console.log(sum, total);
      average = sum / total;
    } else {
      //console.log('meta.ratings undefined:', meta);
    }
    //console.log('calcd average:', average);
    return average;
  };
  const calculateTotal = () => {
    let total = 0;
    //console.log('calc total, meta.ratings:', meta.ratings);
    if (meta.ratings) {
      let keys = Object.keys(meta.ratings);
      for (let k of keys) {
        total += parseInt(meta.ratings[k]);
      }
    }
    //console.log('calcd total:', total);
    return total;
  }

  const getReviewsMeta = () => (
    axios.get(serverURL + '/meta', {
      headers: {
        Authorization: config.API_KEY,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      params: {
        product_id: productID,
      }
    })
    .then(response => response.data)
    .catch(err => console.log('Error getting review meta data:', err))
  );

  const getReviews = (page=1, count=2, sort='relevant') => (
    axios.get(serverURL, {
      headers: {
        Authorization: config.API_KEY,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      params: {
        product_id: productID,
        page: page,
        count: count,
        sort: sort
      }
    })
    .then(response => response.data)
    .then(data => {
      (data.results.length === 0) ? setMore(false) : setMore(true);
      return data;
    }).then(data => data) // this is what gets 'returned'
    .catch(err => console.log('Error getting review data:', err))
  );

  const debounce = (fn, interval) => {
    let free = true;
    return function() {
      if (free) {
        free = false;
        setTimeout(() => free = true, interval);
        let result = fn.apply(this, arguments);
        return result;
      }
    }
  }

  const markHelpful = (review_id) => {
    return axios.put(`${serverURL}/${review_id}/helpful`,{}, {
      headers: {
        Authorization: config.API_KEY,
        'Access-Control-Allow-Origin': '*'
      }
    })
    .then(res => res)
    .catch(err => console.log('Error marking review as helpful:', err));
  }
  const reportReview = (review_id) => {
    axios.put(`${serverURL}/${review_id}/report`, {}, {
      headers: {
        Authorization: config.API_KEY,
        'Access-Control-Allow-Origin': '*'
      }
    }).catch(err => console.log('Error reporting a review:', err));
  }

  const searchFilter = (review) => {
    let keys = ['summary', 'body', 'reviewer_name']
    let re = RegExp(search.toLowerCase());
    return keys.reduce((memo, k) => {
      return re.test(review[k].toLowerCase()) ? true : memo;
    }, false);
  };

  const toggleFilter = (filter) => {
    let index = ratingFilter.indexOf(filter);
    if (index > -1) {
      let filtered = ratingFilter.filter(rate => rate !== filter)
      setRatingFilter(filtered);
    } else {
      setRatingFilter([...ratingFilter, filter]);
    }
  };

  const formatDate = (dateStr) => {
    let date = new Date(dateStr);
    // need to figure out how to configure locale
    return date.toLocaleDateString('en-US', {
      month: 'long', day: 'numeric', year: 'numeric'
    });
  }
  const positionArrowWidgets = () => {
    if (meta.characteristics) {
      let keys = Object.keys(meta.characteristics);
      keys.map((char, i) => {
        let arrow = document.getElementsByClassName('characteristics-arrow')[i];
        if (arrow) {
          let bar = arrow.parentElement;
          let value = Number(meta.characteristics[char].value);
          //let left = bar.offsetLeft + (bar.offsetWidth *  value / 5) - arrow.offsetWidth / 2;
          let left = (bar.offsetWidth *  value / 5) - (arrow.width);
          //console.log('value:', value, 'left padding:', left);
          arrow.style.paddingLeft = left;
        }
      })
    }
  }
  window.addEventListener('resize', positionArrowWidgets);

  /* render once product id changes */
  useEffect(() => {
    getReviewsMeta()
      .then(data => setMeta(data))
      .then(() => {
        getReviews(1, 5).then(data => setReviews(data.results));
      })
  }, [productID]); // effect runs on product id change
  useEffect(() => {
    /* non responsive rendering (doesn't fix if page resizes) */
    setTotal(calculateTotal());
    positionArrowWidgets();
  }, [meta]);
  useEffect(() => setAverage(calculateAverage()), [total]);

  /* render when reviews change */
  useEffect(() => {
    let loadedReviews = Array.from(document.getElementsByClassName('review-tile'));
    let targetWidget = document.getElementById('rr-no-reviews-showing');
    let hiddenReviews = loadedReviews.filter(rev => rev.classList.contains('hidden'));
    if (targetWidget) {
      if (hiddenReviews.length === reviews.length) {
        targetWidget.classList.contains('hidden') ? targetWidget.classList.toggle('hidden') : null;
      } else {
        targetWidget.classList.contains('hidden') ? null : targetWidget.classList.toggle('hidden');
      }
    }
  }, [ratingFilter, reviews, search]);

  /* render when sort changes */
  useEffect(() => {
    getReviews(1, reviews.length || 2, sort).then(data => {
      setReviews(data.results);
    });
  }, [sort]);


  return (
    <div className="rr" id="rr">
      <h1>Ratings & Reviews Section</h1>
      {/*
      <p className="testing">
        <em onClick={() => console.log(reviews)}>This part is just for testing, I'll remove it
          once we tie everything together</em><br />
        Total: {total}<br />
        Average: {average.toFixed(2)}<br />
        Product ID: {productID}<br />
        Product Name: <span id="rr-product-name"></span><br />
        <input id="rr-product-id" type="text" />
        <button onClick={() =>
            setProductID(document.getElementById('rr-product-id').value)
          }>
          load product information
        </button><br />
        <em>or use the slider! (Just click on it. If you click and drag
        the slider, you'll get an API error)</em>
        <input
          type="range"
          min="65631"
          max="66641"
          onChange={({target}) => setProductID(target.value)}
        />
      </p>
      */}
      <div className="review-grid">
        <SortOptions
          setSort={setSort}
          search={search}
          setSearch={setSearch}
          total={total}
        />
        <RatingBreakDown
          meta={meta}
          average={average}
          toggleFilter={toggleFilter}
          ratingFilter={ratingFilter}
          total={total}
          reviews={reviews}
        />
        <ProductBreakDown
          meta={meta}
          reviews={reviews}
        />
        <ReviewList
          more={more}
          search={search}
          reviews={reviews}
          searchFilter={searchFilter}
          getReviews={getReviews}
          setReviews={setReviews}
          productID={productID}
          count={count}
          sort={sort}
          ratingFilter={ratingFilter}
          formatDate={formatDate}
          debounce={debounce}
          helpful={markHelpful}
          setHelpful={setHelpfulReviews}
          helpfulReviews={helpfulReviews}
          total={total}
          reportReview={reportReview}
        />
        <WriteReview />
      </div>
    </div>
  )
};

/* sub components */
let ReviewList = (props) => {
  /* initial rendering and changes to product id */
  // infinite scroll, not working correctly
  let retrieveReviews = () => {
    if (props.more) {
      props.getReviews((props.reviews.length / props.count) + 1, props.count, props.sort)
        .then(data => props.setReviews(props.reviews.concat(data.results)))
        .catch(err => console.log('Error retrieving reviews from infinite scroll', err))
    }
  }
  retrieveReviews = props.debounce(retrieveReviews, 500);

  return (
    <div
      className="review-list"
      onScroll={({target}) => {
        let btn = document.getElementById('rr-write-review-btn');
        btn.classList.add('float');
        //btn.style.top = window.innerHeight - target.offsetHeight;
        btn.style.top = window.innerHeight - btn.offsetHeight * 2;
        btn.style.left = target.offsetLeft;
        btn.style.width = target.offsetWidth;
        if (Math.abs((target.scrollTop + target.clientHeight) - target.scrollHeight) < 10) {
          retrieveReviews();
          btn.classList.remove('float');
          btn.style.width = '';
        } else if (target.scrollTop === 0) {
          btn.classList.remove('float');
        }
      }}
    >
      {props.reviews.length ? props.reviews.map((review,i) => 
        <ReviewTile
          key={i}
          review={review}
          search={props.search}
          searchFilter={props.searchFilter}
          ratingFilter={props.ratingFilter}
          formatDate={props.formatDate}
          helpful={props.helpful}
          setHelpful={props.setHelpful}
          helpfulReviews={props.helpfulReviews}
          total={props.total}
          reportReview={props.reportReview}
        />)
       : <p>There are no reviews to display</p> }
      {props.reviews.length ? <p id="rr-no-reviews-showing">No reviews to show with selected filters! Try including more filters or load more reviews to see some results.</p> : ''}
      { props.more ? (
        <button onClick={() => {
          props.getReviews((props.reviews.length / props.count) + 1, props.count, props.sort)
            .then(data => props.setReviews(props.reviews.concat(data.results)));
        }}>More Reviews</button> // add infinite scroll later on
      ) : '' }
      <div id='rr-write-review-btn'><button  onClick={() => document.getElementsByClassName('write-review')[0].classList.toggle('hidden')}>Add a review</button></div>
    </div>
  )
};

let ReviewTile = (props) => {
  let hidden = false
  if (props.search.length > 2) {
    if (props.searchFilter(props.review)) {
    } else {
      hidden = true;
    }
  }
  if (props.ratingFilter.length) {
    if (props.ratingFilter.indexOf(props.review.rating.toString()) === -1) {
      hidden = true;
    }
  }
  return (
    <div className={hidden ? "review-tile hidden" : "review-tile"}>
      <div>
        <span className="star-rating"><StarRating rating={props.review.rating} /></span>
        <div className="reviewer-and-date">
          {/* there is no way to verify if user_id / email  is associated with a purchase */}
           {props.review.reviewer_name}, {props.formatDate(props.review.date)}
        </div>
      </div>
      <p className="bold">{props.review.summary}</p>
      {
        (props.review.body.length <= 250) ?
          <p>{props.review.body}</p>
          :
            <p>
              {props.review.body.slice(0, 250)}...
              <br /><a
                style={{color: 'blue'}}
                onClick={(ev) => {
                ev.preventDefault();
                let p = ev.target.parentElement;
                p.removeChild(p.children[0]);
                p.textContent += props.review.body.slice(250);
              }}>Show More</a>
            </p>
      }
      {props.review.photos.map((obj, i) =>
        <img
          className='review-thumbnail'
          key={i}
          src={obj.url}
          onClick={({target}) => {
            target.classList.toggle('hidden');
            target.classList.toggle('image-modal');
            target.classList.toggle('review-thumbnail');
            setTimeout(() => target.classList.toggle('hidden'), 200);
          }}
        />)
      }
      { props.review.recommend ?
          <p>
            <img className="checkmark" src='./img/rr/checkmark.svg' />
            I recommend this product
          </p> : '' }
      {props.review.reponse ? <div className="review-response"><p><strong>Response</strong></p><p>{props.review.response}</p></div> : ''}
      { props.helpfulReviews.includes(props.review.review_id) ? '' :
        <p>
          Was this review helpful?
          <button
            onClick={() => {
              props.helpful(props.review.review_id)
              .then(() => props.setHelpful([...props.helpfulReviews, props.review.review_id]));
            }}
          >
            Yes
          </button> ({props.review.helpfulness})
          {/* BRD mentions a 'No' button, but the API doesn't retain or allow posts to this value, deferring to mockup */}
          <span
            className="report"
            onClick={({target}) => {
              props.reportReview(props.review.review_id);
              target.parentElement.parentElement.classList.toggle('hidden');
            }}
          >
            Report
          </span>
        </p>
      }
    </div>
  )
};

let StarRating = (props) => {
  let render = (rating) => {
    let res = [];
    let i = 0;
    // fill in full stars
    for (i; i < Math.trunc(rating); i++) {
      res.push(<img key={i} className="star" src='./img/rr/star-full.svg' />);
    }
    // fill in partial star
    let partial = rating - Math.trunc(rating);
    if (partial > 0) {
      if (partial <= 0.25) {
        res.push(<img key={i} className="star" src='./img/rr/star-quarter.svg' />);
      } else if (partial <= 0.5) {
        res.push(<img key={i} className="star" src='./img/rr/star-half.svg' />);
      } else if (partial <= 0.75) {
        res.push(<img key={i} className="star" src='./img//rr/star-three-quarter.svg' />);
      } else {
        res.push(<img key={i} className="star" src='./img/rr/star-full.svg' />);
      }
      i++;
    }
    // fill in empty
    while (res.length < 5) {
      res.push(<img key={i} className="star" src='./img/rr/star-empty.svg' />);
      i++;
    }
    return res;
  }
  return <span>{render(props.rating)}</span>
};

let PercentWidget = (props) => (
  <div
    className={
      props.ratingFilter.indexOf(props.stars) > -1 ?
        'rating-filter selected' : 'rating-filter'
    }
    onClick={()=>
      props.toggleFilter(props.stars)
    }>
    {props.stars} stars <div className='rating-bar'>
      <div className='inner-bar' style={{width: `${props.percent.toFixed(2)}%`}}></div>
    </div> ({props.count})
  </div>
);

let RatingBreakDown = (props) => {
  //let keys = props.meta ? (props.meta.ratings ? Object.keys(props.meta.ratings).reverse() : []) : [];
  let keys = [5, 4, 3, 2, 1];
  console.log(props.meta);
  if (props.reviews.length) {
    return (
      <div className="rating-breakdown">
        <h2>Rating Breakdown</h2>
        <h1>{props.average.toFixed(1)}<sup><StarRating rating={props.average} /></sup></h1>
        <p>{
          props.meta.recommended ?
            Math.round(Number(props.meta.recommended.true) * 100 / (Number(props.meta.recommended.true) + Number(props.meta.recommended.false)))
            : 0}
          % of reviews recommended this product
        </p>
        {props.meta.ratings ? keys.map(i =>
          <PercentWidget
            stars={i}
            key={i}
            percent={parseInt(props.meta.ratings[i] || 0) / props.total * 100}
            count={props.meta.ratings[i]}
            toggleFilter={props.toggleFilter}
            ratingFilter={props.ratingFilter}
          />
        ) : ''}
        {props.ratingFilter.length ? <p>Filtering reviews for these ratings: {props.ratingFilter.map(star => `${star} Stars`).join(', ')}</p> : ''}
      </div>
    )
  } else {
    return <div className='rating-breakdown'><p>No reviews yet</p></div>
  }
};

let ProductBreakDown = (props) => {
  let keys = props.meta ? (props.meta.characteristics ? Object.keys(props.meta.characteristics) : []) : [];
  if (props.reviews.length) {
    return (
      <div className="product-breakdown">
        <h2>Product Breakdown</h2>
        {keys.map((char,i) =>
          <CharacteristicsWidget key={i} name={char} />
        )}
      </div>
    )
  } else {
    return <div className='product-breakdown'><p>No reviews yet</p></div>
  }
};
let CharacteristicsWidget = (props) => {
  let text = {
    Fit: {left: 'Too tight', middle: 'Perfect', right: 'Too loose'},
    Comfort: {left: 'Uncomfortable', middle: 'Average', right: 'Comfortable'},
    Length: {left: 'Too short', middle: 'Perfect', right: 'Too long'},
    Quality: {left: 'Poor', middle: 'Average', right: 'Great'},
    Size: {left: 'Too small', middle: 'Just right', right: 'Too large'},
    Width: {left: 'Too thin', middle: 'Just right', right: 'Too wide'},
  }
  return (
    <div className='characteristics'>
      {props.name}
      <div className='characteristics-bar'>
        <img className='characteristics-arrow' src='./img/rr/arrow.svg' />
      </div>
      <div className='characteristics-description'>
        <p className='rr-left'>{text[props.name].left}</p>
        <p className='rr-middle'>{text[props.name].middle}</p>
        <p className='rr-right'>{text[props.name].right}</p>
      </div>
    </div>
  )
}

let SortOptions = (props) => (
<div className="sort-options">
  <div>
    {!isNaN(props.total) ? props.total : 0} reviews, sorted by <select onChange={({target}) => props.setSort(target.value)}>
      <option value="related">relevance</option>
      <option value="helpful">helpfulness</option>
      <option value="newest">newest</option>
    </select>
    Search Reviews:<input type="search" value={props.search} onChange={({target}) => {
      props.setSearch(target.value);
    }}/>
  </div>
</div>
);

let WriteReview = (props) => {
  let characteristics = {
    Size: {
      1: 'A size too small', 
      2: '1/2 a size too small',
      3: 'Perfect',
      4: '1/2 a size too big',
      5: 'A size too wide'
    },
    Width: {
      1: 'Too narrow',
      2: 'Slightly narrow',
      3: 'Perfect',
      4: 'Slightly wide',
      5: 'Too wide'
    },
    Comfort: {
      1: 'Uncomfortable',
      2: 'Slightly uncomfortable',
      3: 'Ok',
      4: 'Comfortable',
      5: 'Perfect'
    },
    Quality: {
      1: 'Poor',
      2: 'Below Average',
      3: 'What I expected',
      4: 'Pretty great',
      5: 'Perfect'
    },
    Length: {
      1: 'Runs short',
      2: 'Below average',
      3: 'What I expected',
      4: 'Runs slightly long',
      5: 'Runs long'
    },
    Fit: {
      1: 'Runs tight',
      2: 'Runs slightly tight',
      3: 'Perfect',
      4: 'Runs slightly long',
      5: 'Runs long'
    }
  }
  let keys = Object.keys(characteristics);
  return (
    <div className="hidden write-review">
      <div className='close'
      style={{color: 'blue', textDecoration: 'underline'}}
      onClick={() => document.getElementsByClassName('write-review')[0].classList.toggle('hidden')}
    >
      Cancel Review (close)
      </div>
      <h1>Write Review</h1>
      <h2>Overall rating (mandatory)</h2>
      <p>[interactive stars with highlight-on-hover will go here] 1 - poor, 2 - fair, 3 - average, 4 - good, 5 - great </p>
      <h2>Do you recommend this product? (mandatory)</h2>
      <p><input type="radio" name="recommend" value="true" /> Yes</p>
      <p><input type="radio" name="recommend" value="false" /> No</p>
      <h2>Characteristics (mandatory)</h2>
      <table>
        <tbody>
        {
          keys.map((k, i) => 
            <tr key={i}>
              <td><strong>{k}</strong></td>
              {[1, 2, 3, 4, 5].map(field => 
                <td key={field}>{characteristics[k][field]} <input type='radio' name={k} value={field} /></td>
              )}
            </tr>
          )
        }
        </tbody>
      </table>
      <h2>Review Summary (mandatory)</h2>
      <p>[limit to 60 characters]</p>
      <input type="text" name="review-summary" placeholder="Example: Best purchase ever!" />
      <h2>Review body (mandatory)</h2>
      <p>[minimum 50, max 1000 characters]</p>
      <textarea rows="24" cols="80" name="review-body" ></textarea>
      <h2>Upload your photos</h2>
      <p>[this is gonna be tricky]</p>
      <h2>Your email (mandatory)</h2>
      <p>[up to 60 characters]</p>
      <input type="email" placeholder="Example: jackson11@email.com" />
      <p>For authentication reasonse, you will not be emailed.</p>
      <button>Submit Review</button>
      <p>[check that for blank mandatory fields, review body [50, 1000] in length, proper email format, and valid images selected]</p>
    </div>
  )
};

export default ReviewsAndRatings;
