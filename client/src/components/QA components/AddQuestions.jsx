import React, { useState } from 'react';
import Modal from './AddQuestions/Modal.jsx'

function AddQuestions(props) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button type="button" onClick={() => setIsOpen(true)}>Open Modal</button>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        Hello James. Add a Question here
      </Modal>
    </div>
  );
}

export default AddQuestions;
