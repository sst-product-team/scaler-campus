import React, { useState } from "react";
import { Modal, Form, Input, Switch, Button, DatePicker } from "antd";
import axios from "axios";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

function EditStudent({ user, modalOpen, setModalOpen }) {
  const [form] = Form.useForm();
  const putUrl = `${process.env.REACT_APP_API_URL}/api/v0/user/${user.UserId}`;
  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Updated values:", values);
        setModalOpen(false);
        axios
          .put(putUrl, values)
          .then((response) => {
            console.log("Student updated:", response.data);
          })
          .catch((error) => {
            console.error("There was an error updating the student!", error);
          });
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Modal
      title="Edit User Details"
      open={modalOpen}
      onCancel={() => {
        setModalOpen(false);
      }}
      onOk={handleSave}
      centered={true}
      okText={"Save"}
    >
      <Form
        {...layout}
        form={form}
        initialValues={{
          UserId: user.UserId,
          name: user.Name,
          email: user.Email,
          phone: user.PhoneNumber,
          loginAllowed: user.LoginAllowed,
        }}
        className="my-10 pr-10"
      >
        <Form.Item label="User ID" name="UserId">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input />
        </Form.Item>
        <Form.Item label="Phone Number" name="phone">
          <Input />
        </Form.Item>
        <Form.Item
          label="Login Allowed"
          name="loginAllowed"
          valuePropName={user.LoginAllowed ? "checked" : "unchecked"}
        >
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default EditStudent;
