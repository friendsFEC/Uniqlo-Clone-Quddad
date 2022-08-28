import React from 'react';
import YourOutfitEntry from './YourOutfitEntry.jsx'

class YourOutfit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div>
        <h3 className = "rc-title">Your Outfit:</h3>
        <YourOutfitEntry />
      </div>
    )
  }
}

export default YourOutfit;