import React, { useState } from "react";
import CreatePoll from "./CreatePoll";

function PollForms() {
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
        <div className="info">Polling and Voting</div>
        <div className="actions">
          <button className="butn" onClick={handleOpenModal}>
            Create Poll
          </button>
          <CreatePoll modalOpen={modalOpen} setModalOpen={setModalOpen} />
        </div>
      </div>
    </div>
  );
}

export default PollForms;
