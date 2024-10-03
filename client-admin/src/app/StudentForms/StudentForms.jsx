import React, { useState } from "react";
import CreateForm from "./CreateForm";
import { useLocation } from "react-router-dom";
import useScope from "../../hooks/useScope";
import AccessNotFound from "../../components/AccessNotFound";

export default function StudentForms() {
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
          <div className="info">Student Forms</div>
          <div className="actions">
            <button className="butn" onClick={handleOpenModal}>
              Create Form
            </button>
            <CreateForm modalOpen={modalOpen} setModalOpen={setModalOpen} />
          </div>
        </div>
      </div>
    );
  } else {
    return <AccessNotFound />;
  }
}
