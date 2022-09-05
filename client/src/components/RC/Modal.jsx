/* eslint-disable */
import React from 'react';

const Modal = ({ open, onClose, selectedProductID, productID, product, currentInfo}) => {
  if (!open) return null;
  const notApplicable = "Not Applicable";

  // const allFeatures = [];
  // allFeatures.push(currentInfo.features);
  // allFeatures.push(product.features);
  // const mergedFeatures = [].concat.apply([], allFeatures);
  // console.log(mergedFeatures)
  // const filteredFeatures = {};
  // mergedFeatures.forEach(item => {
  //   if (!filteredFeatures.hasOwnProperty(item[feature])) {
  //     filteredFeatures[]
  //   }
  //   console.log(item, 'ITEM')
  //   console.log(item.feature, 'ITEM[FEATURE]')
  // })


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
              <td>{feature.value || notApplicable}</td>
              <td>{feature.feature}</td>
              <td>{notApplicable}</td>
            </tr>
          })}
          {product.features.map((feature, index) => {
            return <tr key = {index}>
              <td>{notApplicable}</td>
              <td>{feature.feature}</td>
              <td>{feature.value || notApplicable}</td>
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

// inside the modal table line 38 area
// if the current info's feature matches the selected product's feature, then we will render the value of the selected product