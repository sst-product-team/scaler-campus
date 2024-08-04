import { DeleteButton, useTable } from "@refinedev/antd";
import { Button, Drawer, Form, Modal, Table } from "antd";
import React, { useState } from "react";
import AddStudentBatches from "./AddStudentBatches";

function BatchStudentList({ batch, modalOpen, setModalOpen }) {
  const { tableProps } = useTable({
    resource: "api/v0/batch/" + batch.BatchId + "/students",
    queryOptions: {
      onSuccess: (data) => {
        console.log(data);
      },
    },
  });
  const [addStudentModal, setAddStudentModal] = useState(false);
  function handleAddStudentClick() {
    setAddStudentModal(true);
  }
  let title = `Students of ${batch.Name}`;
  return (
    <Drawer
      width="100VW"
      title={title}
      open={modalOpen}
      onClose={() => {
        setModalOpen(false);
      }}
    >
      <div className="p-4 space-y-4 ">
        <Table {...tableProps} className="">
          <Table.Column title="Email" />
          <Table.Column
            title="Actions"
            render={(text, record) => (
              <div className="actions">
                <DeleteButton
                  size="small"
                  hideText={true}
                  onClick={() => {}}
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
            Add Student
          </Button>
        </div>
      </div>
      {addStudentModal && (
        <AddStudentBatches
          modalOpen={addStudentModal}
          setModalOpen={setAddStudentModal}
          batchId={batch.BatchId}
        ></AddStudentBatches>
      )}
    </Drawer>
  );
}

export default BatchStudentList;
