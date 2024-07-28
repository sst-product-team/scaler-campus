import "./Students.css";
import { useExport } from "@refinedev/core";
import {
  useTable,
  useImport,
  ImportButton,
  ExportButton,
} from "@refinedev/antd";
import { Table } from "antd";

export default function Students() {
  const importProps = useImport({
    mapData: (item) => {
      return {
        userId: item.userId,
        name: item.name,
        email: item.email,
        phoneNumber: item.phoneNumber,
      };
    },
    batchSize: 10,
  });
  const { triggerExport, isLoading: exportLoading } = useExport();

  const { tableProps } = useTable({
    resource: "api/v0/user",
    meta: {
      data: "data",
    },
    queryOptions: {
      onSuccess: (data) => {
        data.data = data.data.data; // Ensure the table gets the nested data array
      },
    },
  });

  return (
    <div className="Students">
      <div className="topNavActions">
        <div className="info">Manage Students</div>
        <div className="actions">
          <ImportButton {...importProps} />
          <ExportButton onClick={triggerExport} loading={exportLoading} />
          {/* <button className="butn">Add Student</button> */}
        </div>
      </div>
      <div className="studentDisplay">
        <Table {...tableProps} rowKey="userId">
          <Table.Column dataIndex="userId" title="ID" />
          <Table.Column dataIndex="name" title="Name" />
          <Table.Column dataIndex="email" title="Email" />
          <Table.Column dataIndex="phoneNumber" title="Phone Number" />
        </Table>
      </div>
    </div>
  );
}
