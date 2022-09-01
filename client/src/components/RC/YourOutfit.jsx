import React from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const YourOutfit = () => {
    return (
      <div>
        <h3 className = "rc-title">Your Outfit:</h3>
        <div className = "rc-yo-main">
          <button className = "rc-yo-remove-button"><AiOutlineCloseCircle/></button>
          <button className = "rc-yo-add-button" onClick = {() => console.log('zzz')}>Add to Your Outfit</button>
        </div>
      </div>
    )
}

export default YourOutfit;