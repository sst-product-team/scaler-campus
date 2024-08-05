import React, { useState } from "react";
import { Modal, Form, Input } from "antd";
import axios from "axios";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

function EditCourse({ course, modalOpen, setModalOpen }) {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Updated values:", values);
    setModalOpen(false);
  };
  const putUrl = `https://8hbbktpk-5001.inc1.devtunnels.ms/api/v0/course/${course.id}`

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Form data:", values);
        setModalOpen(false);
        axios
          .put(
            putUrl,
            values
          )
          .then((response) => {
            console.log("Course Updated:", response.data);
            form.resetFields();
          })
          .catch((error) => {
            console.error("There was an error updating the Course!", error);
          });
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Modal
      title="Edit Course Details"
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
          id: course.id,
          name: course.Name,
          desc: course.Description,
        }}
        className="my-10 pr-10"
        onFinish={onFinish}
      >
        <Form.Item label="Course ID" name="id">
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

export default EditCourse;
