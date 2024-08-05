import { DeleteButton, useTable } from "@refinedev/antd";
import { Button, Drawer, Table } from "antd";
import React, { useState } from "react";
import AddWithIds from "../../components/AddWithIds";

function CourseBatchList({ course, modalOpen, setModalOpen }) {
  const { tableProps } = useTable({
    resource: "api/v0/course/" + course.id + "/batches",
    queryOptions: {
      onSuccess: (data) => {
        console.log(data);
      },
    },
  });
  const [addBatchesModal, setaddBatchesModal] = useState(false);
  function handleAddStudentClick() {
    setaddBatchesModal(true);
  }
    const url = `api/v0/course/${course.id}/batches`;
  let title = `Batches of ${course.Name}`;
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
          <Table.Column dataIndex="BatchId" title="BatchId" />
          <Table.Column dataIndex="Name" title="Name" />
          <Table.Column
            title="Actions"
            render={(text, record) => (
              <div className="actions">
                <DeleteButton
                  size="small"
                  hideText={true}
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
            Add Batches
          </Button>
        </div>
      </div>
      {addBatchesModal && (
        <AddWithIds
          modalOpen={addBatchesModal}
          setModalOpen={setaddBatchesModal}
          title={"Add Batches"}
          postParam={"batches"}
          postUrl={`https://8hbbktpk-5001.inc1.devtunnels.ms/api/v0/course/${course.id}/batches`}
        ></AddWithIds>
      )}
    </Drawer>
  );
}

export default CourseBatchList;
