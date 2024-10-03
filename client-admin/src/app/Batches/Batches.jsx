import { useTable, EditButton, ShowButton } from "@refinedev/antd";
import { Table, Button } from "antd";
import { useState } from "react";
import BatchStudentList from "./BatchStudentList";
import AddBatches from "./AddBatches";
import EditBatch from "./EditBatch";
import { useLocation } from "react-router-dom";
import useScope from "../../hooks/useScope";
import AccessNotFound from "../../components/AccessNotFound";

export default function Batches() {
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
  const location = useLocation();
  const [, inScope] = useScope(location.pathname);

  const handleDetailClick = (record) => {
    setSelectedBatch(record);
    setDetailModalOpen(true);
  };
  const handleEditClick = (record) => {
    setSelectedBatch(record);
    setEditModalOpen(true);
  };

  if (inScope) {
    return (
      <div className="Students">
        <div className="topNavActions">
          <div className="info">Manage Batches</div>
          <div className="actions">
            <Button
              className="refine-create-button"
              onClick={() => {
                setModalOpen(true);
              }}
            >
              Add Batch
            </Button>
            <AddBatches
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
            ></AddBatches>
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

        {editModalOpen && (
          <EditBatch
            batch={selectedBatch}
            modalOpen={editModalOpen}
            setModalOpen={setEditModalOpen}
          />
        )}
      </div>
    );
  }
  return <AccessNotFound />;
}
