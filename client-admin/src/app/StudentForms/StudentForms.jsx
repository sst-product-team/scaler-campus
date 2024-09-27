import React, { useState } from 'react';
import CreateForm from './CreateForm'; 

export default function StudentForms() {
    const [modalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
        setModalOpen(true);
      };
      
      const handleCloseModal = () => {
        setModalOpen(false);
      };

  return (
    <div className="Students">
      <div className="topNavActions">
        <div className="info">
          Student Forms
        </div>
        <div className="actions">
          <button className="butn" onClick={handleOpenModal}>
            Create Form
          </button>
          <CreateForm modalOpen={modalOpen} setModalOpen={setModalOpen} />
      
        </div>
      </div>
    </div>
  );
}
