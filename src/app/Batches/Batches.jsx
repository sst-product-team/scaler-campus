import {
  useTable,
  useImport,
  ImportButton,
  EditButton,
  ShowButton,
} from "@refinedev/antd";
import { Table, Input, Button } from "antd";
import AddStudent from "../Students/AddStudent";
import { useState } from "react";
import BatchStudentList from "./BatchStudentList";

export default function Batches() {
  const importProps = useImport({
    resource: "api/v0/user",
    mapData: (item) => {
      console.log(item);
      return {
        name: item.name,
        email: item.email,
        phone: item.phone,
      };
    },
  });

  const { tableProps } = useTable({
    resource: "api/v0/batch",
    queryOptions: {
      onSuccess: (data) => {
        console.log(data);
      },
    },
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState(null);

  const handleDetailClick = (record) => {
    setSelectedBatch(record);
    setDetailModalOpen(true);
  };
  const handleEditClick = (record) => {
    setSelectedBatch(record);
    setEditModalOpen(true);
  };

  return (
    <div className="Students">
      <div className="topNavActions">
        <div className="info">Manage Batches</div>
        <div className="actions">
          <ImportButton {...importProps} />
          <Button
            className="refine-create-button"
            onClick={() => {
              setModalOpen(true);
            }}
          >
            Add Student
          </Button>
          <AddStudent
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
          ></AddStudent>
        </div>
      </div>
      <div className="studentDisplay">
        <Table {...tableProps} rowKey="BatchId">
          <Table.Column dataIndex="BatchId" title="ID" />
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
        <BatchStudentList
          batch={selectedBatch}
          modalOpen={detailModalOpen}
          setModalOpen={setDetailModalOpen}
        ></BatchStudentList>
      )}

      {/* {editModalOpen && (
        // <EditStudent
        //   user={selectedStudent}
        //   modalOpen={editModalOpen}
        //   setModalOpen={setEditModalOpen}
        // />
      )} */}
    </div>
  );
}
