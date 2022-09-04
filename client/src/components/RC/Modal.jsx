/* eslint-disable */
import React from 'react';

const Modal = ({ open, onClose, selectedProductID, productID, product, currentInfo}) => {
  if (!open) return null;
  const notApplicable = "Not Applicable";

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
            return <tr key = {index}>
              <td>{feature.value}</td>
              <td>{feature.feature}</td>
              <td>{notApplicable}</td>
            </tr>
          })}
          {product.features.map((feature, index) => {
            return <tr key = {index}>
              <td>{notApplicable}</td>
              <td>{feature.feature}</td>
              <td>{feature.value}</td>
            </tr>;
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