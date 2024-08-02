import React, { useState } from "react";
import { Modal, Form, Input, Switch, Button, DatePicker } from "antd";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

function EditStudent({ user, modalOpen, setModalOpen }) {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Updated values:', values);
    setModalOpen(false);
  };

  return (
    <Modal
      title="Edit User Details"
      open={modalOpen}
      onCancel={() => {
        setModalOpen(false);
      }}
      centered = {true}
      okText = {"Save"}
    >
      <Form
        {...layout}
        form={form}
        initialValues={{
          UserId: user.UserId,
          Name: user.Name,
          Email: user.Email,
          PhoneNumber: user.PhoneNumber,
          LoginAllowed: user.LoginAllowed,
        }}
        className="my-10 pr-10"
        onFinish={onFinish}
      >
        <Form.Item label="User ID" name="UserId">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Name" name="Name">
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="Email">
          <Input />
        </Form.Item>
        <Form.Item label="Phone Number" name="PhoneNumber">
          <Input />
        </Form.Item>
        <Form.Item label="Login Allowed" name="LoginAllowed" valuePropName="checked">
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default EditStudent;
