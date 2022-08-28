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
    console.log('calc avg:', meta.ratings, total);
    let average = 0;
    if (meta.ratings) {
      let sum = 0;
      for (let i=1; i <= 5; i++) {
        sum += (parseInt(meta.ratings[i]) * i);
      }
      average = sum / total;
    } else {
    }
    console.log('new avg:', average);
    return average;
  };
  const calculateTotal = () => {
    let total = 0;
    if (meta.ratings) {
      for (let i=1; i <= 5; i++) {
        total += parseInt(meta.ratings[i]);
      }
    }
    console.log('calc total:', total);
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
  )
  const getReviews = (page=1, count=2, sort='relevant') => (
    // args: integer for product ID
    // returns: an array of objects
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
    .then(response => {console.log('get review called', meta, productID); return response})
    .then(response => response.data)
    .then(data => {
      console.log(data.results, data.results.length);
      (data.results.length === 0) ? setMore(false) : setMore(true);
      return data;
    }).then(data => data) // this is what gets 'returned'
    .catch(err => console.log('Error getting review data:', err))
  )
  const searchFilter = (review) => {
    let keys = ['summary', 'body', 'reviewer_name']
    let re = RegExp(search.toLowerCase());
    return keys.reduce((memo, k) => {
      return re.test(review[k].toLowerCase()) ? true : memo;
    }, false);
  }
  const toggleFilter = (filter) => {
    let index = ratingFilter.indexOf(filter);
    if (index > -1) {
      let filtered = ratingFilter.filter(rate => rate !== filter)
      setRatingFilter(filtered);
    } else {
      setRatingFilter([...ratingFilter, filter]);
    }
  }
  const formatDate = (dateStr) => {
    let date = new Date(dateStr);
    // need to figure out how to configure locale
    return date.toLocaleDateString('en-US', {
      month: 'long', day: 'numeric', year: 'numeric'
    });
  }

  /* initial rendering and changes to product id */
  useEffect(() => {
    console.log('use effect called');
    getReviewsMeta()
      .then(data => setMeta(data))
      .then(() => {
        getReviews().then(data => setReviews(data.results));
      })
  }, [productID]); // effect runs once
  useEffect(() => setTotal(calculateTotal()), [meta])
  useEffect(() => setAverage(calculateAverage()), [total])
  
  /* render when sort changes */
  useEffect(() => {
    getReviews(productID, 1, reviews.length || 2, sort).then(data => {
      setReviews(data.results);
    });
  }, [sort])

  return (
    <div className="rr">
      <h1>Ratings & Reviews Section</h1>
      <p className="testing">
        <em>This part is just for testing, I'll remove it
          once we tie everything togethor</em><br />
        Total: {total}
        Average: {average}
        Product ID: {productID}
        <input id="rr-product-id" type="text" />
        <button onClick={() =>
            setProductID(document.getElementById('rr-product-id').value)
          }>
          load product information
        </button>
      </p>
      <div className="review-grid">
        <SortOptions
          setSort={setSort}
          search={search}
          setSearch={setSearch}
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
}
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
      }}>More Reviews</button>
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
      <p>
        Rating: <StarRating rating={props.review.rating} /> by {props.review.reviewer_name}  at {props.formatDate(props.review.date)}
      </p>
      <p className="bold">{props.review.summary}</p>
      <p>{props.review.body}</p>
      {props.review.photos.map((obj, i) => <img key={i} src={obj.url} />)}
    </div>
  )
};
let StarRating = (props) => {
  let render = (rating) => {
    let res = '';
    for (let i=0; i < rating; i++) {
      res += '*';
    }
    while (res.length < 5) {
      res += 'o';
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
)
let RatingBreakDown = (props) => {
  let keys = props.meta ? (props.meta.ratings ? Object.keys(props.meta.ratings).reverse() : []) : [];
  return (
    <div className="rating-breakdown">
      <p>Rating Breakdown</p>
      <p><StarRating rating={props.average} /></p>
      <p>Average Rating: {props.average.toFixed(2)} Stars</p>
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
      <p>ProductBreakdown</p>
      {keys.map((char,i) =>
        <p key={i}>{char}: {Number(props.meta.characteristics[char]['value']).toFixed(2)}</p>
      )}
    </div>
  )
};
let SortOptions = (props) => (
<div className="sort-options">
  <div>
    Sort Options <select onChange={({target}) => props.setSort(target.value)}>
      <option>related</option>
      <option>helpful</option>
      <option>newest</option>
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
