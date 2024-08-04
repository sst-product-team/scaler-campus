import {
  useTable,
} from "@refinedev/antd";
import { Table } from "antd";

export default function Courses() {
  
  const { tableProps } = useTable({
    resource: "api/v0/batch",
    queryOptions: {
      onSuccess: (data) => {
        console.log(data);
      },
    },
  });

  return (
    <div className="Students">
      <div className="mx-8">
        <div className="font-bold text-xl my-8">Manage Courses</div>
        <Table {...tableProps} rowKey="BatchId">
          <Table.Column dataIndex="BatchId" title="ID" />
          <Table.Column dataIndex="Name" title="Name" sorter />
          <Table.Column dataIndex="Description" title="Description" />
        </Table>
      </div>
    </div>
  );
}
