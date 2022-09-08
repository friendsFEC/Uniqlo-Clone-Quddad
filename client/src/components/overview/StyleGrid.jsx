import React from 'react';
import { IoIosCheckmarkCircle } from 'react-icons/io';

export default function StyleGrid({ styleData, changeStyle, active}) {
  // selecting a style changes the current style
  return (
    <div>
      <div style={{ display: 'inline-flex', 'align-items': 'center' }}>
        <p style={{ 'font-weight': '500' }}>Style: </p>
        <p style={{ 'padding-left': '5px' }}>{styleData[active].name}</p>
      </div>
      <div className="ov-styleGrid">
        {styleData.map((style, index) => (
          <div
            className="ov-thumbnail ov-checkDiv"
            onClick={() => changeStyle(index)}
            key={index}
            onKeyPress={() => changeStyle(index)}
            role="button"
            tabIndex="-1"
          >
            <IoIosCheckmarkCircle className={active === index ? 'ov-check ov-check--active' : 'ov-check'} />
            <img className={active === index ? 'ov-thumbnail--image ov--style ov--style--active' : 'ov-thumbnail--image ov--style'} src={style.photos[0].thumbnail_url} alt="style" />
          </div>
        ))}
      </div>
    </div>
  );
}
