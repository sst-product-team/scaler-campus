import { useTable, EditButton, ShowButton } from "@refinedev/antd";
import { Table, Button } from "antd";
import { useState } from "react";
import AddLecture from "./AddLectures";
import LectureDetail from "./LectureDetail";
import { useLocation } from "react-router-dom";
import useScope from "../../hooks/useScope";
import AccessNotFound from "../../components/AccessNotFound";

export default function Lectures() {
  const { tableProps } = useTable({
    resource: "api/v0/lecture",
    queryOptions: {
      onSuccess: (data) => {
        console.log(data);
      },
    },
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const location = useLocation();
  const [, inScope] = useScope(location.pathname);

  const handleDetailClick = (record) => {
    setSelectedLecture(record);
    setDetailModalOpen(true);
  };
  const handleEditClick = (record) => {
    setSelectedLecture(record);
    setEditModalOpen(true);
  };

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

  if (inScope) {
    return (
      <div className="Students">
        <div className="topNavActions">
          <div className="info">Manage Lectures</div>
          <div className="actions">
            <Button
              className="refine-create-button"
              onClick={() => {
                setModalOpen(true);
              }}
            >
              Add Lecture
            </Button>
            <AddLecture
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
            ></AddLecture>
          </div>
        </div>
        <div className="studentDisplay">
          <Table {...tableProps} rowKey="LectureId">
            <Table.Column dataIndex="LectureId" title="ID" />
            <Table.Column dataIndex="Name" title="Name" sorter />
            <Table.Column dataIndex="Description" title="Description" />
            <Table.Column
              dataIndex="StartTime"
              title="Start Time"
              render={(text) => formatDate(text)}
            />
            <Table.Column
              dataIndex="EndTime"
              title="End Time"
              render={(text) => formatDate(text)}
            />
            <Table.Column
              dataIndex="LectureDate"
              title="Lecture Date"
              render={(text) => formatDate(text)}
            />
            <Table.Column dataIndex="AttendanceType" title="Attendance Type" />
            <Table.Column
              title="Actions"
              render={(text, record) => (
                <div className="actions">
                  <EditButton
                    hideText={true}
                    onClick={() => {
                      handleEditClick(record);
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
                </div>
              )}
            />
          </Table>
        </div>
        {detailModalOpen && (
          <LectureDetail
            lecture={selectedLecture}
            modalOpen={detailModalOpen}
            setModalOpen={setDetailModalOpen}
          ></LectureDetail>
        )}

        {/* {editModalOpen && (
          <EditLecture
            Lecture={selectedLecture}
            modalOpen={editModalOpen}
            setModalOpen={setEditModalOpen}
          />
        )} */}
      </div>
    );
  }
  return <AccessNotFound />;
}
