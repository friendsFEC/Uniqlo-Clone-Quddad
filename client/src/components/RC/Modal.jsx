import React from 'react'

const Modal = ({ open, onClose, children, features }) => {
  if (!open) return null


  console.log({features})
  return (
    <>
    <div className = "rc-modal-style">
      {JSON.stringify(features)}
    </div>
    </>
  )
}

export default Modal;