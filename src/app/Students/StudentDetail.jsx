import React from "react";
import { Modal } from "antd";
import 'tailwindcss/tailwind.css';

function formatDate(dateString) {
  if (!dateString) return "Never Logged In";
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

function StudentDetail({ user, modalOpen, setModalOpen }) {
  return (
    <Modal
      title="User Details"
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
      <div className="p-4 space-y-4">
        <div className="mb-4">
          <label className="block text-gray-500 font-bold">User ID:</label>
          <p className="text-gray-900">{user.UserId}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-500 font-bold">Name:</label>
          <p className="text-gray-900">{user.Name}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-500 font-bold">Email:</label>
          <p className="text-gray-900">{user.Email}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-500 font-bold">Phone Number:</label>
          <p className="text-gray-900">{user.PhoneNumber}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-500 font-bold">Login Allowed:</label>
          <p className="text-gray-900">{user.LoginAllowed ? 'Yes' : 'No'}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-500 font-bold">Last Login:</label>
          <p className="text-gray-900">{formatDate(user.LastLogin)}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-500 font-bold">Created On:</label>
          <p className="text-gray-900">{formatDate(user.CreatedOn)}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-500 font-bold">Updated On:</label>
          <p className="text-gray-900">{formatDate(user.UpdatedOn)}</p>
        </div>
      </div>
    </Modal>
  );
}

export default StudentDetail;
