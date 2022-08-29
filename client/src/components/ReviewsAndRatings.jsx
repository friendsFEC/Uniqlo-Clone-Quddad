import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import config from '../../../config.js';

const serverURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/rfp/reviews';



let ReviewsAndRatings = (props) => {
  /* hooks */
  const [productID, setProductID] = useState(props.product_id || 65631);
  const [reviews, setReviews] = useState([]);
  const [meta, setMeta] = useState({});
  const [average, setAverage] = useState(0);
  const [total, setTotal] = useState(0);
  const [sort, setSort] = useState('relevant');
  const [more, setMore] = useState(true);
  const [search, setSearch] = useState('');
  const [ratingFilter, setRatingFilter] = useState([]);
  const count = 2;

  /* utility functions */
  const calculateAverage = () => {
    let average = 0;
    if (meta.ratings) {
      let sum = 0;
      for (let i=1; i <= 5; i++) {
        sum += (parseInt(meta.ratings[i]) * i);
      }
      average = sum / total;
    } else {
    }
    return average;
  };

  const calculateTotal = () => {
    let total = 0;
    if (meta.ratings) {
      for (let i=1; i <= 5; i++) {
        total += parseInt(meta.ratings[i]);
      }
    }
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

  /* initial rendering and changes to product id */
/* // infinite scroll, not working correctly
  useEffect(() => {
    let r = document.getElementsByClassName('review-list')[0];
		let f = ({target}) => {
			if ((target.scrollTop + target.clientHeight) === target.scrollHeight) {
				if (more) {
					getReviews((reviews.length / count) + 1, count, sort)
          .then(data => setReviews(reviews.concat(data.results)))
				}
			}
		};
		r.addEventListener('scroll', f)
  }, []);
*/
  useEffect(() => {
    getReviewsMeta()
      .then(data => setMeta(data))
      .then(() => {
        getReviews().then(data => setReviews(data.results));
      })
  }, [productID]); // effect runs once
  useEffect(() => setTotal(calculateTotal()), [meta]);
  useEffect(() => setAverage(calculateAverage()), [total]);

  /* for testing, safe to delete after component integration */
  useEffect(() => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/products/${productID}`, {
      headers: {
        Authorization: config.API_KEY,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(response => response.data)
      .then(data => document.getElementById('rr-product-name').textContent = data.name)
      .catch(err => console.log('Error getting product information'))
  }, [productID]);
  
  /* render when sort changes */
  useEffect(() => {
    getReviews(1, reviews.length || 2, sort).then(data => {
      setReviews(data.results);
    });
  }, [sort]);

  return (
    <div className="rr">
      <h1>Ratings & Reviews Section</h1>
      <p className="testing">
        <em>This part is just for testing, I'll remove it
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
        />
        <ProductBreakDown meta={meta} />
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
        />
        <WriteReview />
      </div>
    </div>
  )
};

/* sub components */
let ReviewList = (props) => (
  <div className="review-list">
    {props.reviews.map((review,i) =>
    <ReviewTile
      key={i}
      review={review}
      search={props.search}
      searchFilter={props.searchFilter}
      ratingFilter={props.ratingFilter}
      formatDate={props.formatDate}
    />)}
    { props.more ? (
      <button onClick={() => {
        props.getReviews((props.reviews.length / props.count) + 1, props.count, props.sort)
          .then(data => props.setReviews(props.reviews.concat(data.results)));
      }}>More Reviews</button> // add infinite scroll later on
    ) : '' }
    <button onClick={() => document.getElementsByClassName('write-review')[0].classList.toggle('hidden')}>Add a review</button>
  </div>
);

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
           {props.review.reviewer_name}, {props.formatDate(props.review.date)}
        </div>
      </div>
      <p className="bold">{props.review.summary}</p>
      <p>{props.review.body}</p>
      {props.review.photos.map((obj, i) => <img key={i} src={obj.url} />)}
    </div>
  )
};

let StarRating = (props) => {
  let render = (rating) => {
    let res = [];
    let i = 0;
    // fill in full stars
    for (i; i < Math.trunc(rating); i++) {
      res.push(<img key={i} className="star" src='./img/star-full.svg' />);
    }
    // fill in partial star
    let partial = rating - Math.trunc(rating);
    if (partial > 0) {
      if (partial <= 0.25) {
        res.push(<img key={i} className="star" src='./img/star-quarter.svg' />);
      } else if (partial <= 0.5) {
        res.push(<img key={i} className="star" src='./img/star-half.svg' />);
      } else if (partial <= 0.75) {
        res.push(<img key={i} className="star" src='./img/star-three-quarter.svg' />);
      } else {
        res.push(<img key={i} className="star" src='./img/star-full.svg' />);
      }
      i++;
    }
    // fill in empty
    while (res.length < 5) {
      res.push(<img key={i} className="star" src='./img/star-empty.svg' />);
      i++;
    }
    return res;
  }
  return <span>{render(props.rating)}</span>
};

let PercentWidget = (props) => (
  <p
    className={
      props.ratingFilter.indexOf(props.stars) > -1 ?
        'rating-filter selected' : 'rating-filter'
    }
    onClick={()=>
      props.toggleFilter(props.stars)
    }>
    {props.stars} Star: {props.percent.toFixed(2)}%
  </p>
);

let RatingBreakDown = (props) => {
  let keys = props.meta ? (props.meta.ratings ? Object.keys(props.meta.ratings).reverse() : []) : [];
  return (
    <div className="rating-breakdown">
      <h2>Rating Breakdown</h2>
      <h1>{props.average.toFixed(1)}<sup><StarRating rating={props.average} /></sup></h1>
      {keys.map(i =>
        <PercentWidget
          stars={i}
          key={i}
          percent={parseInt(props.meta.ratings[i]) / props.total * 100}
          toggleFilter={props.toggleFilter}
          ratingFilter={props.ratingFilter}
        />
      )}
    </div>
  )
};

let ProductBreakDown = (props) => {
  let keys = props.meta ? (props.meta.characteristics ? Object.keys(props.meta.characteristics) : []) : [];
  return (
    <div className="product-breakdown">
      <h2>ProductBreakdown</h2>
      {keys.map((char,i) =>
        <p key={i}>{char}: {Number(props.meta.characteristics[char]['value']).toFixed(2)}</p>
      )}
    </div>
  )
};

let SortOptions = (props) => (
<div className="sort-options">
  <div>
    {props.total} reviews, sorted by <select onChange={({target}) => props.setSort(target.value)}>
      <option value="related">relevance</option>
      <option value="helpful">helpfulness</option>
      <option value="newest">newest</option>
    </select>
    Search Reviews:<input type="text" value={props.search} onChange={({target}) => {
      props.setSearch(target.value);
    }}/>
  </div>
</div>
);

let WriteReview = (props) => (
  <div className="hidden write-review">
    <p>Write Review</p>
    <p
      style={{color: 'blue', textDecoration: 'underline'}}
      onClick={() => document.getElementsByClassName('write-review')[0].classList.toggle('hidden')}
    >close</p>
  </div>
);

export default ReviewsAndRatings;
