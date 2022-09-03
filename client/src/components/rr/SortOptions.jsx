import React from 'react';
import PropTypes from 'prop-types';

export default function SortOptions(props) {
  return (
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
  )
};
