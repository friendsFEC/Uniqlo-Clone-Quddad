import React from 'react';

class Filter extends React.Component {
  constructor(props) {
    super(props);

    this.searchQuestion = this.searchQuestion.bind(this);
  }

  searchQuestion(event) {
    console.log(event.target.value);
  }

  render() {
    return (
      <div id="qa-filter">
        <input type='text' id='qa-filter-input'
        name='qa-filter-name'
        placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..."
        onChange={this.searchQuestion}/>
      </div>
    )
  }
}

export default Filter;
