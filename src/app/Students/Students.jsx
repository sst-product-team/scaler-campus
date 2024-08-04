import "./Students.css";
import {
  useTable,
  useImport,
  ImportButton,
  EditButton,
  ShowButton,
} from "@refinedev/antd";
import { Table, Input, Button } from "antd";
import AddStudent from "./AddStudent";
import { useState } from "react";
import StudentDetail from "./StudentDetail";
import EditStudent from "./EditStudent";

export default function Students({ stateChange }) {
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
    resource: "api/v0/user",
    queryOptions: {
      onSuccess: (data) => {;
        console.log(data);
      },
    },
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleDetailClick = (record) => {
    setSelectedStudent(record);
    setDetailModalOpen(true);
  };
  const handleEditClick = (record) => {
    setSelectedStudent(record);
    setEditModalOpen(true);
  };

  return (
    <div className="Students">
      <div className="topNavActions">
        <div className="info">Manage Students</div>
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
        <Table {...tableProps} rowKey="UserId">
          <Table.Column dataIndex="UserId" title="ID" />
          <Table.Column dataIndex="Name" title="Name" sorter />
          <Table.Column dataIndex="Email" title="Email" />
          <Table.Column dataIndex="PhoneNumber" title="Phone Number" />
          <Table.Column
            dataIndex="LoginAllowed"
            title="Login Allowed"
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
                    background: "#D85B3B",
                    borderRadius: 100,
                  }}
                />
              )
            }
          />
          <Table.Column
            dataIndex="LastLogin"
            title="Last Login"
            render={(text) => text || "Never Logged In"}
          />
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
        <StudentDetail
          user={selectedStudent}
          modalOpen={detailModalOpen}
          setModalOpen={setDetailModalOpen}
        />
      )}

      {editModalOpen && (
        <EditStudent
          user={selectedStudent}
          modalOpen={editModalOpen}
          setModalOpen={setEditModalOpen}
        />
      )}
    </div>
  );
}
