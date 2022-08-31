import React from 'react'

const Modal = ({ open, onClose, children, product, currentInfo}) => {
  if (!open) return null
  const NA = "not applicable"
  // issue here:
  // features are different for each product, so I am comparing everything to current product's features
  return (
    <div className = "rc-modal-style">
      <table>
        <thead>
          <tr>
            <th colSpan="3">Comparing:</th>
          </tr>
          <tr>
            <th>{currentInfo.name}</th>
            <th></th>
            <th>{product.name}</th>
          </tr>
        </thead>
        <tbody>
          {currentInfo.features.map(feature => {
            return <tr>
              <td>{feature.value}</td>
              <td>{feature.feature}</td>
              <td>{null}</td>
            </tr>
          })}
          {product.features.map(feature => {
            return <tr>
              <td>{null}</td>
              <td>{feature.feature}</td>
              <td>{feature.value}</td>
            </tr>
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Modal;