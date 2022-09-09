import React, { useState } from 'react';
import AddQuestionsModal from './Modals/AddQuestionsModal.jsx'

function AddQuestions(props) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button className="qa-astext" type="button" onClick={() => setIsOpen(true)}><h2>Add a Question +</h2></button>
      <AddQuestionsModal open={isOpen} onClose={() => setIsOpen(false)}>
        <h2>Ask a question</h2>
        <h3>About the PRODUCT NAME here</h3>
      </AddQuestionsModal>
    </div>
  );
}

export default AddQuestions;
