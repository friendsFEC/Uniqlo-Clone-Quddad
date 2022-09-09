import React from 'react';

function Filter(props) {
  const {searchQuestions} = props;
  return (
    <div id="qa-filter">
      <input
        type="text"
        id="qa-filter-input"
        name="qa-filter-name"
        placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..."
        onChange={searchQuestions}
      />
    </div>
  );
}

export default Filter;
