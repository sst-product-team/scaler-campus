import React, { useState } from "react";
import axios from "axios";
import Modal from "antd/es/modal/Modal";
import { Form, Input } from "antd";

function AddBatches({ modalOpen, setModalOpen }) {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Form data:", values);
        setModalOpen(false);
        axios
          .post(
            "https://campus-auth-backend-node-adxvh.ondigitalocean.app/api/v0/batch",
            values
          )
          .then((response) => {
            console.log("Batch added:", response.data);
            form.resetFields();
          })
          .catch((error) => {
            console.error("There was an error adding the Batch!", error);
          });
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Modal
      title={"Add Batche"}
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
            { required: true, message: "Please input the batche's name!" },
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
              message: "Please input the batche's description!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddBatches;
