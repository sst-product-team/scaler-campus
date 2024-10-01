import React, { useState } from "react";
import axios from "axios";
import Modal from "antd/es/modal/Modal";
import { Form, Input } from "antd";

function AddStudent({ modalOpen, setModalOpen }) {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Form data:", values);
        setModalOpen(false);
        axios
          .post(`${process.env.REACT_APP_API_URL}/api/v0/user`, values)
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
      title={"Add Student"}
      open={modalOpen}
      onCancel={() => {
        setModalOpen(false);
      }}
      okText={"Submit"}
      onOk={handleSubmit}
      centered={true}
    >
      <Form form={form} layout="vertical" className="m-10">
        <Form.Item
          label="Name"
          name="name"
          rules={[
            { required: true, message: "Please input the student's name!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input the student's email!" },
          ]}
        >
          <Input type="email" />
        </Form.Item>
        <Form.Item
          label="Phone Number"
          name="phone"
          rules={[
            {
              required: true,
              message: "Please input the student's phone number!",
            },
          ]}
        >
          <Input type="tel" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddStudent;
