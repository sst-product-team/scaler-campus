import "./Students.css";
import { useExport } from "@refinedev/core";
import {
  useTable,
  useImport,
  ImportButton,
  ExportButton,
  EditButton,
  ShowButton
} from "@refinedev/antd";
import { Table, Input } from "antd";


export default function Students({experience}) {
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
        data.data = data.data.data;
      },
    },
  });

  return (
    <div className="Students">
      <div className="topNavActions">
        <div className="info">Manage Students</div>
        <div className="actions">
          <ImportButton {...importProps}  />
          <ExportButton onClick={triggerExport} loading={exportLoading} />
          {/* <button className="butn">Add Student</button> */}
        </div>
      </div>
      <div className="studentDisplay">
        <Table {...tableProps} rowKey="userId">
          <Table.Column dataIndex="UserId" title="ID" />
          <Table.Column dataIndex="Name" title="Name" sorter />
          <Table.Column dataIndex="Email" title="Email" />
          <Table.Column dataIndex="PhoneNumber" title="Phone Number" />
          <Table.Column dataIndex="LoginAllowed" title="Login Allowed" render={(value) => (value ? <div style={{width: 20, height: 20, background:"#5CD83B", borderRadius: 100}} /> : <div style={{width: 20, height: 20, background:"#D85B3B", borderRadius: 100}} />)} />
          <Table.Column dataIndex="LastLogin" title="Last Login" render={(text) => (text || "Never Logged In")} />
          <Table.Column dataIndex="actions" title="Actions" render={(text, record) => (
            <div className="actions">
              <EditButton hideText={true} onClick={() => {
                console.log("Edit", record);  
              }}/>
              <ShowButton hideText={true} />
            </div>
          )} />
        </Table>
      </div>
    </div>
  );
}
