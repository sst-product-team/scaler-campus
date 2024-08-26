import { useTable, EditButton, ShowButton } from "@refinedev/antd";
import { Table, Button } from "antd";
import { useState } from "react";

import AddCourses from "./AddCourses";
import EditCourse from "./EditCourse";
import CourseBatchList from "./CourseBatchList";

export default function Courses() {
  const { tableProps } = useTable({
    resource: "course",
    queryOptions: {
      onSuccess: (data) => {
        console.log(data);
      },
    },
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleDetailClick = (record) => {
    setSelectedCourse(record);
    setDetailModalOpen(true);
  };
  const handleEditClick = (record) => {
    setSelectedCourse(record);
    setEditModalOpen(true);
  };

  return (
    <div className="Students">
      <div className="topNavActions">
        <div className="info">Manage Coursees</div>
        <div className="actions">
          <Button
            className="refine-create-button"
            onClick={() => {
              setModalOpen(true);
            }}
          >
            Add Course
          </Button>
          <AddCourses
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
          ></AddCourses>
        </div>
      </div>
      <div className="studentDisplay">
        <Table {...tableProps} rowKey="id">
          <Table.Column dataIndex="id" title="ID" />
          <Table.Column dataIndex="Name" title="Name" sorter />
          <Table.Column dataIndex="Description" title="Description" />
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
        <CourseBatchList
          course={selectedCourse}
          modalOpen={detailModalOpen}
          setModalOpen={setDetailModalOpen}
        ></CourseBatchList>
      )}

      {editModalOpen && (
        <EditCourse
          course={selectedCourse}
          modalOpen={editModalOpen}
          setModalOpen={setEditModalOpen}
        />
      )}
    </div>
  );
}
