import React, { useState } from 'react';
import Modal from './AddQuestions/Modal.jsx'

function AddQuestions(props) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button className="qa-astext" type="button" onClick={() => setIsOpen(true)}><h2>Add a Question +</h2></button>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <h2>Ask your question</h2>
        <h3>About the PRODUCT NAME here</h3>
      </Modal>
    </div>
  );
}

export default AddQuestions;
