import React, { useState } from "react";
import CreatePoll from "./CreatePoll";
import { useLocation } from "react-router-dom";
import useScope from "../../hooks/useScope";
import AccessNotFound from "../../components/AccessNotFound";

function PollForms() {
  const [modalOpen, setModalOpen] = useState(false);
  const location = useLocation();
  const [, inScope] = useScope(location.pathname);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  if (inScope) {
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
  } else {
    return <AccessNotFound />;
  }
}

export default PollForms;
