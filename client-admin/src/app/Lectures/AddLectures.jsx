import React, { useState } from "react";
import axios from "axios";
import Modal from "antd/es/modal/Modal";
import { Form, Input, DatePicker, Select } from "antd";
import MultiSelect from "../../components/MultiSelect";

function AddLecture({ modalOpen, setModalOpen }) {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        // Format the date and time fields
        const formattedValues = {
          ...values,
          startTime: values.startTime.toISOString(),
          endTime: values.endTime.toISOString(),
          //   LectureDate: values.LectureDate.toISOString(),
        };

        console.log("Form data:", formattedValues);
        setModalOpen(false);

        axios
          .post(
            `${process.env.REACT_APP_API_URL}/api/v0/lecture`,
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
        {/* <Form.Item
          label="Lecture ID"
          name="LectureId"
          rules={[{ required: true, message: "Please input the Lecture ID!" }]}
        >
          <Input />
        </Form.Item> */}
        <Form.Item
          label="Name"
          name="Name"
          rules={[
            { required: true, message: "Please input the Lecture's name!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="Description"
          rules={[
            {
              required: true,
              message: "Please input the Lecture's description!",
            },
          ]}
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
        {/* <Form.Item
          label="Lecture Date"
          name="LectureDate"
          rules={[{ required: true, message: "Please select the lecture date!" }]}
        >
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item> */}
        <Form.Item
          label="Attendance Type"
          name="attendanceType"
          rules={[
            { required: true, message: "Please select the attendance type!" },
          ]}
        >
          <Select>
            <Select.Option value="mandatory">Mandatory</Select.Option>
            <Select.Option value="optional">Optional</Select.Option>
          </Select>
        </Form.Item>
        <MultiSelect />
        <Form.Item
          label="Minimum Attendance (%)"
          name="minimumAttendance"
          rules={[
            {
              required: true,
              message: "Please input the minimum attendance percentage!",
            },
          ]}
        >
          <Input type="number" min={0} max={100} />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddLecture;
