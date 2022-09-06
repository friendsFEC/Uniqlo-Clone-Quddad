import React from 'react';
import PropTypes from 'prop-types';
import { GrClose } from 'react-icons/gr';

export default function Alert({ show, trigger }) {
  if (show) {
    return (
      <span className="ov-alert">
        Items Added To Cart!
        <GrClose role="button" tabIndex="0" onKeyPress={() => trigger(false)} onClick={() => trigger(false)} />
      </span>
    );
  }
  return null;
}

Alert.propTypes = {
  show: PropTypes.bool.isRequired,
  trigger: PropTypes.func.isRequired,
};
