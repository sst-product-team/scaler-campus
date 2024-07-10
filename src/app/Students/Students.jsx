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
        title: item.title,
        content: item.content,
        status: item.status,
        category: {
          id: item.categoryId,
        },
        user: {
          id: item.userId,
        },
      };
    },
    batchSize: 10,
  });
  const { triggerExport, isLoading: exportLoading } = useExport();

  const { tableProps } = useTable({ resource: "user" });

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
        <Table {...tableProps} rowKey="id">
          <Table.Column dataIndex="userId" title="ID" />
          <Table.Column dataIndex="name" title="Name" />
          <Table.Column dataIndex="email" title="Email" />
          <Table.Column dataIndex="phoneNumber" title="Phone Number" />
        </Table>
      </div>
    </div>
  );
}
