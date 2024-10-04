import { Badge, Modal } from "antd";
import React from "react";

const PollDetail = ({ poll, modalOpen, setModalOpen }) => {
  return (
    <Modal
      title="Poll Details"
      open={modalOpen}
      onOk={() => {
        setModalOpen(false);
      }}
      onCancel={() => {
        setModalOpen(false);
      }}
      footer={null}
      centered={true}
    >
      <div className="p-6 space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900">Poll ID</h3>
          <p className="text-sm text-gray-600">{poll._id}</p>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900">Question</h3>
          <p className="text-sm text-gray-600">{poll.question}</p>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900">Options</h3>
          <ul className="space-y-2">
            {Object.entries(poll.options).map(([option, votes]) => (
              <li key={option} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{option}</span>
                <Badge variant="secondary">{votes.length} votes</Badge>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900">Status</h3>

          <div
            className={
              "text-lg " +
              (poll.acceptingResponses ? "text-green-400" : "text-red-500")
            }
          >
            {poll.acceptingResponses ? "Accepting Responses" : "Closed"}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PollDetail;
