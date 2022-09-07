import React, { useState } from 'react';
import ReactDom from 'react-dom';

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#FFF',
  padding: '50px',
  zIndex: 1000,
};

const OVERLAY_STYLE = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  zIndex: 1000,
};

function AddAnswersModal({ open, children, onClose }) {
  if (!open) {
    return null;
  }

  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLE} />
      <div style={MODAL_STYLES}>
        {children}
        <br />
        Answer:
        <input
          type="text"
          id="qa-addAnswer--answer"
          name="name"
          required
          minLength="10"
          maxLength="1000"
          size="10"
        />
        <br />
        <input
          type="text"
          id="qa-addAnswer--username"
          name="name"
          required
          minLength="3"
          maxLength="60"
          size="10"
          placeholder="Example: jackson11!"
        />
        <br />
        <p>For privacy reasons, do not use your full name or email address</p>
        <br />
        <input
          type="email"
          id="qa-addQuestion--email"
          name="name"
          required
          minLength="3"
          maxLength="60"
          size="10"
          placeholder="Example: jack@email.com"
        />
        <br />
        <p>For authentication reasons, you will not be emailed</p>
        <br />
        <input
          type="text"
          id="qa-addQuestion--opinion"
          name="name"
          required
          minLength="3"
          maxLength="60"
          size="10"
          placeholder="Why did you like the product or not?"
        />
        <br />
        <button type="submit">Submit</button>
        <button type="button" onClick={onClose}>Close Modal</button>
      </div>
    </>,
    document.getElementById('portal'),
  );
}

export default AddAnswersModal;
