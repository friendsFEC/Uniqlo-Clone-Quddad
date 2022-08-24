import React from 'react'

let App = (props) => (
  <div>
    <Joey />
    <Chandler />
    <Ross />
    <Rachel />
  </div>
)

class Joey extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="Joey">
        <h3>This is James</h3>
      </div>
    )
  }
}

export default App;
