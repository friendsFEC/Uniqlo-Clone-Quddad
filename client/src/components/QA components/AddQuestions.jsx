import React, { useState } from 'react';
import Modal from './AddQuestions/Modal.jsx'

function AddQuestions(props) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button className="qa-astext" type="button" onClick={() => setIsOpen(true)}><h2>Add a Question +</h2></button>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        {/* Hello James. Add a Question here */}
      </Modal>
    </div>
  );
}

export default AddQuestions;
