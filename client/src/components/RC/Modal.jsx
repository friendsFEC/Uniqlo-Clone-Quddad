import React from 'react'

const Modal = ({ open, onClose, children }) => {
  if (!open) return null

  return (
    <div>
      {children}
    </div>
  )
}

export default Modal;