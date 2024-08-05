import React, { useState } from "react";
import axios from "axios";
import Modal from "antd/es/modal/Modal";
import { Form, Input, DatePicker, Select } from "antd";


function AddLecture({ modalOpen, setModalOpen }) {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        const formattedValues = {
          ...values,
          minAttendance : parseInt(values.minAttendance),
          startTime: values.startTime.toISOString(),
          endTime: values.endTime.toISOString(),
        };

        console.log("Form data:", formattedValues);
        setModalOpen(false);

        axios
          .post(
            "https://8hbbktpk-5001.inc1.devtunnels.ms/api/v0/lecture",
            formattedValues
          )
          .then((response) => {
            console.log("Lecture added:", response.data);
            form.resetFields();
          })
          .catch((error) => {
            console.error("There was an error adding the Lecture!", error);
          });
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Modal
      title={"Add Lecture"}
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
          name="Name"
          rules={[{ required: true, message: "Please input the Lecture's name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="Description"
          rules={[{ required: true, message: "Please input the Lecture's description!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Start Time"
          name="startTime"
          rules={[{ required: true, message: "Please select the start time!" }]}
        >
          <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
        </Form.Item>
        <Form.Item
          label="End Time"
          name="endTime"
          rules={[{ required: true, message: "Please select the end time!" }]}
        >
          <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
        </Form.Item>
        <Form.Item
          label="Attendance Type"
          name="attendanceType"
          rules={[{ required: true, message: "Please select the attendance type!" }]}
        >
          <Select>
            <Select.Option value="mandatory">Mandatory</Select.Option>
            <Select.Option value="optional">Optional</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Minimum Attendance (%)"
          name="minAttendance"
          rules={[{ required: true, message: "Please input the minimum attendance percentage!" }]}
        >
          <Input type="number" min={0} max={100} />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddLecture;
