import React from 'react';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import PropTypes from 'prop-types';

export default function StyleGrid({ styleData, changeStyle, active}) {
  // selecting a style changes the current style
  return (
    <div>
      <div style={{ display: 'inline-flex', alignItems: 'center' }}>
        <p style={{ fontWeight: '500' }}>Style: </p>
        <p style={{ paddingLeft: '5px' }}>{styleData[active].name}</p>
      </div>
      <div className="ov-styleGrid">
        {styleData.map((style, index) => (
          <div
            className="ov-thumbnail ov-checkDiv"
            onClick={() => changeStyle(index)}
            key={style.name}
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

StyleGrid.propTypes = {
  styleData: PropTypes.oneOfType([PropTypes.object]).isRequired,
  changeStyle: PropTypes.func.isRequired,
  active: PropTypes.number.isRequired,
};
