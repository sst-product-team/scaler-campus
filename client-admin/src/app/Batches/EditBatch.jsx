import React, { useState } from "react";
import { Modal, Form, Input, Switch, Button, DatePicker } from "antd";
import axios from "axios";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

function EditBatch({ batch, modalOpen, setModalOpen }) {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Updated values:", values);
    setModalOpen(false);
  };
  const putUrl = `${process.env.REACT_APP_API_URL}/api/v0/batch/${batch.BatchId}`;

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Form data:", values);
        setModalOpen(false);
        axios
          .put(putUrl, values)
          .then((response) => {
            console.log("Batch Updated:", response.data);
            form.resetFields();
          })
          .catch((error) => {
            console.error("There was an error updating the Batch!", error);
          });
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Modal
      title="Edit Batch Details"
      open={modalOpen}
      onCancel={() => {
        setModalOpen(false);
      }}
      onOk={handleSubmit}
      centered={true}
      okText={"Save"}
    >
      <Form
        {...layout}
        form={form}
        initialValues={{
          batchId: batch.BatchId,
          name: batch.Name,
          desc: batch.Description,
        }}
        className="my-10 pr-10"
        onFinish={onFinish}
      >
        <Form.Item label="Batch ID" name="batchId">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="desc">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default EditBatch;
