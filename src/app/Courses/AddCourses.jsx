import React, { useState } from "react";
import axios from "axios";
import Modal from "antd/es/modal/Modal";
import { Form, Input } from "antd";

function AddCourses({ modalOpen, setModalOpen }) {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Form data:", values);
        setModalOpen(false);
        axios
          .post(
            "https://8hbbktpk-5001.inc1.devtunnels.ms/api/v0/course",
            values
          )
          .then((response) => {
            console.log("Course added:", response.data);
            form.resetFields();
          })
          .catch((error) => {
            console.error("There was an error adding the Course!", error);
          });
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Modal
      title={"Add Course"}
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
            { required: true, message: "Please input the Course's name!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="desc"
          rules={[
            {
              required: true,
              message: "Please input the Course's description!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddCourses;
