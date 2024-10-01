import React, { useState } from "react";
import axios from "axios";
import Modal from "antd/es/modal/Modal";
import { Form, Input } from "antd";

function AddStudentBatches({ modalOpen, setModalOpen, batchId }) {
  const [form] = Form.useForm();
  const [studentIds, setStudentIds] = useState([]);
  const postUrl = `${process.env.REACT_APP_API_URL}/api/v0/batch/${batchId}/students`;

  const handleInputChange = (e) => {
    const value = e.target.value;
    const trimmedString = value.trim(); // Remove leading and trailing spaces
    const numArray = trimmedString
      .split(",")
      .filter((num) => num !== "")
      .map((num) => parseInt(num.trim(), 10));
    setStudentIds(numArray);
    console.log("Num array:", numArray);
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then(() => {
        console.log("Data Sent :", studentIds);
        setModalOpen(false);
        axios
          .post(postUrl, { students: studentIds })
          .then((response) => {
            console.log("Student added:", response.data);
            form.resetFields();
          })
          .catch((error) => {
            console.error("There was an error adding the student!", error);
          });
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Modal
      title="Add Student"
      open={modalOpen}
      onOk={handleSubmit}
      onCancel={() => {
        setModalOpen(false);
      }}
      centered={true}
    >
      <Form form={form} layout="vertical" className="m-10">
        <Form.Item
          label="Student Id"
          name="studentId"
          rules={[
            { required: true, message: "Please input the student's name!" },
          ]}
        >
          <Input onChange={handleInputChange} />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddStudentBatches;
