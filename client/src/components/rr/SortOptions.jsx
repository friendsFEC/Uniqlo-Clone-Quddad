import React from 'react';
import PropTypes from 'prop-types';

function SortOptions({
  total, setSort, search, setSearch,
}) {
  const displayTotal = !Number.isNaN(total) ? total : 0;
  return (
    <div className="sort-options">
      <div>
        {`${displayTotal} reviews, sorted by`}
        <select onChange={({ target }) => setSort(target.value)}>
          <option value="related">relevance</option>
          <option value="helpful">helpfulness</option>
          <option value="newest">newest</option>
        </select>
        Search Reviews:
        <input
          type="search"
          value={search}
          onChange={({ target }) => {
            setSearch(target.value);
          }}
        />
      </div>
    </div>
  );
}

SortOptions.propTypes = {
  total: PropTypes.number.isRequired,
  setSort: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
};

export default SortOptions;
