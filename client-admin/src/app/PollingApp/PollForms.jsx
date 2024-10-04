import React, { useState } from "react";
import CreatePoll from "./CreatePoll";
import PollDetail from "./PollDetail";
import ShareButton from "./ShareButton";
import { useLocation } from "react-router-dom";
import useScope from "../../hooks/useScope";
import AccessNotFound from "../../components/AccessNotFound";
import { Table } from "antd";
import { DeleteButton, Show, ShowButton, useTable } from "@refinedev/antd";
import { toast } from "react-toastify";

function PollForms() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPoll, setSelectedPoll] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const location = useLocation();
  const [, inScope] = useScope(location.pathname);

  const { tableProps } = useTable({
    resource: "api/v1/poll",
    queryOptions: {
      onSuccess: (data) => {
        console.log(data);
      },
    },
  });

  const copyToClipboard = (poll) => {
    const textToCopy = process.env.REACT_APP_WEBSITE_URL + "/poll/" + poll._id;

    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        // setCopySuccess("Copied!");
        console.log("Successfully Copied");
      })
      .catch((err) => {
        // setCopySuccess("Failed to copy");
        console.error("Error copying text: ", err);
      });
  };

  const handleDetailClick = (record) => {
    setSelectedPoll(record);
    setDetailModalOpen(true);
  };

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
        <div className="studentDisplay">
          <Table {...tableProps} rowKey="_id">
            <Table.Column dataIndex="_id" title="ID" />
            <Table.Column dataIndex="question" title="Question" />
            <Table.Column
              dataIndex="acceptingResponses"
              title="Accepting Responses"
              className=""
              render={(value) =>
                value ? (
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      background: "#5CD83B",
                      borderRadius: 100,
                      margin: "0 50%",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      background: "#ed717a",
                      borderRadius: 100,
                      margin: "0 50%",
                    }}
                  />
                )
              }
            />
            <Table.Column
              title="Actions"
              render={(text, record) => (
                <div className="actions">
                  <DeleteButton
                    hideText={true}
                    onClick={() => {
                      // handleEditClick(record);
                      console.log("Edit", record);
                    }}
                  />
                  <ShowButton
                    hideText={true}
                    onClick={() => {
                      handleDetailClick(record);
                      console.log("Show", record);
                    }}
                  />
                  <ShareButton
                    onClick={() => {
                      copyToClipboard(record);
                      console.log("Copy", record);
                    }}
                  />
                </div>
              )}
            />
          </Table>
        </div>
        {detailModalOpen && (
          <PollDetail
            poll={selectedPoll}
            modalOpen={detailModalOpen}
            setModalOpen={setDetailModalOpen}
          />
        )}
      </div>
    );
  } else {
    return <AccessNotFound />;
  }
}

export default PollForms;
