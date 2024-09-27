import React, { useState } from "react";
import axios from "axios";
import Modal from "antd/es/modal/Modal";
import { Form, Input } from "antd";

function AddWithIds({ modalOpen, setModalOpen, postUrl, title, postParam }) {
  const [form] = Form.useForm();
  const [arrayIds, setarrayIds] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    const trimmedString = value.trim(); // Remove leading and trailing spaces
    const numArray = trimmedString
      .split(",")
      .filter((num) => num !== "")
      .map((num) => parseInt(num.trim(), 10));
    setarrayIds(numArray);
    console.log("Num array:", numArray);
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then(() => {
        console.log("Data Sent :", arrayIds);
        setModalOpen(false);
        axios
          .post(postUrl, { [postParam]: arrayIds })
          .then((response) => {
            console.log("Id Added:", response.data);
            form.resetFields();
          })
          .catch((error) => {
            console.error("There was an error adding the id's!", error);
          });
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Modal
      title={title}
      open={modalOpen}
      onOk={handleSubmit}
      onCancel={() => {
        setModalOpen(false);
      }}
      centered={true}
    >
      <Form form={form} layout="vertical" className="m-10">
        <Form.Item
          label="Id"
          name="Id"
          rules={[{ required: true, message: "Please input the id's!" }]}
        >
          <Input onChange={handleInputChange} />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddWithIds;
