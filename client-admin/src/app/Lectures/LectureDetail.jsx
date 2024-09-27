import React from "react";
import { Modal } from "antd";

function formatDate(dateString) {
  if (!dateString) return "Never Logged In";
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

function LectureDetail({ lecture, modalOpen, setModalOpen }) {
  return (
    <Modal
      title="Lecture Details"
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
          <label className="block text-gray-500 font-bold">Lecture ID:</label>
          <p className="text-gray-900">{lecture.LectureId}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-500 font-bold">Name:</label>
          <p className="text-gray-900">{lecture.Name}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-500 font-bold">Description:</label>
          <p className="text-gray-900">{lecture.Description}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-500 font-bold">Start Time:</label>
          <p className="text-gray-900">{formatDate(lecture.StartTime)}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-500 font-bold">End Time:</label>
          <p className="text-gray-900">{formatDate(lecture.EndTime)}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-500 font-bold">Lecture Date:</label>
          <p className="text-gray-900">{formatDate(lecture.LectureDate)}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-500 font-bold">Attendance Type:</label>
          <p className="text-gray-900">{lecture.AttendanceType}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-500 font-bold">Minimum Attendance (%):</label>
          <p className="text-gray-900">{lecture.MininumAttendance}</p>
        </div>
      </div>
    </Modal>
  );
}

export default LectureDetail;
