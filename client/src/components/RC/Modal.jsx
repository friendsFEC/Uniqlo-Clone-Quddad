/* eslint-disable */
import React from 'react';

const Modal = ({ open, onClose, selectedProductID, productID, product, currentInfo}) => {
  if (!open) return null;

  if (selectedProductID === product.id) {
    return (
    <div className = "rc-modal-style">
      <table>
        <thead>
          <tr>
            <th colSpan="3" className = "rc-modal-title">Comparing:</th>
          </tr>
          <tr>
            <th>{currentInfo.name}</th>
            <th>Details:</th>
            <th>{product.name}</th>
          </tr>
        </thead>
        <tbody>
          {currentInfo.features.map((feature, index) => {
            if (product.features[index] && product.features[index].feature === feature.feature) {
              return <tr key = {index}>
                <td>{feature.value || 'N/A'}</td>
                <td>{feature.feature}</td>
                <td>{product.features[index].value || 'N/A'}</td>
              </tr>
            } else {
            return <tr key = {index}>
              <td>{feature.value || 'N/A'}</td>
              <td>{feature.feature}</td>
              <td>{'N/A'}</td>
            </tr>
            }
          })}
          {product.features.map((feature, index) => {
            if (currentInfo.features[index] && currentInfo.features[index].feature === feature.feature) {
              return null;
            } else {
            return <tr key = {index}>
              <td>{'N/A'}</td>
              <td>{feature.feature}</td>
              <td>{feature.value || 'N/A'}</td>
            </tr>;
            }
          })}
        </tbody>
      </table>
    </div>
   );
  } else {
    return null;
  }
};

export default Modal;
