import { DeleteButton, useTable } from "@refinedev/antd";
import { Button, Drawer, Table } from "antd";
import React, { useState } from "react";
import AddWithIds from "../../components/AddWithIds";

function formatDate(dateString) {
  if (!dateString) return "Never Logged In";
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

function LectureDetail({ lecture, drawerOpen, setDrawerOpen }) {
  console.log("Lecture", lecture);
  const { tableProps } = useTable({
    resource: "api/v0/lecture/" + lecture.LectureId + "/courses",
    queryOptions: {
      onSuccess: (data) => {
        console.log(data);
      },
    },
  });

  const [addCoursesModal, setaddCoursesModal] = useState(false);
  function handleAddStudentClick() {
    setaddCoursesModal(true);
  }

  const url = `api/v0/lecture/${lecture.LectureId}/batches`;

  return (
    <Drawer
      title="Lecture Details"
      open={drawerOpen}
      onClose={() => {
        setDrawerOpen(false);
      }}
      width="100VW"
      centered={true}
    >
      <div className="py-10 px-32 space-y-4">
        <div className="mb-4 flex flex-col">
          <label className="block text-gray-500 font-bold">Lecture ID:</label>
          <p className="text-gray-900">{lecture.LectureId}</p>
        </div>
        <div className="flex justify-between items-center">
          <div className="mb-4 flex flex-col">
            <label className="block text-gray-500 font-bold">Name:</label>
            <p className="text-gray-900">{lecture.Name}</p>
          </div>
          <div className="mb-4 flex flex-col">
            <label className="block text-gray-500 font-bold">
              Description:
            </label>
            <p className="text-gray-900">{lecture.Description}</p>
          </div>
        </div>
        <div className="mb-4 flex justify-between">
          <div className="flex flex-col">
            <label className="block text-gray-500 font-bold">Start Time:</label>
            <p className="text-gray-900">{formatDate(lecture.StartTime)}</p>
          </div>
          <div className="flex flex-col">
            <label className="block text-gray-500 font-bold">End Time:</label>
            <p className="text-gray-900">{formatDate(lecture.EndTime)}</p>
          </div>
        </div>
        <div className="mb-4 flex justify-between">
          <div className="flex flex-col">
            <label className="block text-gray-500 font-bold">
              Attendance Type:
            </label>
            <p className="text-gray-900">{lecture.AttendanceType}</p>
          </div>
          <div className="flex flex-col">
            <label className="block text-gray-500 font-bold">
              Minimum Attendance (%):
            </label>
            <p className="text-gray-900">{lecture.MininumAttendance}</p>
          </div>
        </div>
      </div>

      <Table {...tableProps} className="">
        {/* <Table.Column dataIndex="BatchId" title="BatchId" /> */}
        <Table.Column dataIndex="Name" title="Subscribed Courses" />
        <Table.Column
          title=""
          render={(text, record) => (
            <div className="actions">
              <DeleteButton
                size="small"
                resource={url}
                recordItemId={record.BatchId}
              ></DeleteButton>
            </div>
          )}
        />
      </Table>
      <div className="w-full flex justify-center items-center">
        <Button
          onClick={() => {
            handleAddStudentClick();
          }}
        >
          Add Coureses
        </Button>
      </div>
      {addCoursesModal && (
        <AddWithIds
          modalOpen={addCoursesModal}
          setModalOpen={setaddCoursesModal}
          title={"Add Courses"}
          postUrl={`https://8hbbktpk-5001.inc1.devtunnels.ms/api/v0/lecture/${lecture.LectureId}/courses`}
          postParam={"courses"}
        />
      )}
    </Drawer>
  );
}

export default LectureDetail;
