import React, { useState } from "react";
import { Modal, Form, Input, Button, Alert } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";

const CreatePoll = ({ modalOpen, setModalOpen }) => {
  const [form] = Form.useForm();
  const [options, setOptions] = useState(["", ""]);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const validOptions = options.filter((opt) => opt.trim() !== "");

      if (validOptions.length < 2) {
        setError("Please provide at least two non-empty options.");
        return;
      }

      const pollData = {
        question: values.question,
        options: validOptions,
      };

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/poll`,
        pollData
      );
      console.log("Poll created:", response.data);
      setModalOpen(false);
      resetForm();
    } catch (info) {
      console.log("Failed:", info);
      setError(
        "Failed to create poll. Please check your inputs and try again."
      );
    }
  };

  const resetForm = () => {
    form.resetFields();
    setOptions(["", ""]);
    setError("");
  };

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const removeOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
    form.setFieldsValue({ [`option_${index}`]: undefined });
  };

  return (
    <Modal
      title="Create a Poll"
      open={modalOpen}
      onCancel={() => {
        setModalOpen(false);
        resetForm();
      }}
      footer={[
        <Button
          key="submit"
          onClick={handleSubmit}
          className="bg-gray-800 hover:bg-gray-800 border-gray-800 text-white"
        >
          Create Poll
        </Button>,
      ]}
      centered
      className="bg-gray-50 rounded-lg"
    >
      <Form form={form} layout="vertical" className="mt-4">
        <Form.Item
          name="question"
          label={<span className="text-gray-700">Question</span>}
          rules={[{ required: true, message: "Please input your question!" }]}
        >
          <Input
            placeholder="Enter your question"
            className="w-full border-b border-gray-300 focus:border-gray-700 transition-all duration-300 bg-transparent"
          />
        </Form.Item>
        {options.map((option, index) => (
          <Form.Item
            key={index}
            label={<span className="text-gray-700">Option {index + 1}</span>}
            required={false}
            className="mb-2 animate-fadeIn"
          >
            <div className="relative">
              <Input
                placeholder={`Enter option ${index + 1}`}
                value={option}
                onChange={(e) => {
                  const newOptions = [...options];
                  newOptions[index] = e.target.value;
                  setOptions(newOptions);
                }}
                className="w-full border-b border-gray-300 focus:border-gray-700 transition-all duration-300 bg-transparent pr-8"
              />
              {options.length > 2 && (
                <DeleteOutlined
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-700 cursor-pointer transition-colors duration-300"
                  onClick={() => removeOption(index)}
                />
              )}
            </div>
          </Form.Item>
        ))}
        <Form.Item>
          <Button
            type="dashed"
            onClick={addOption}
            block
            icon={<PlusOutlined />}
            className="mt-2 border-gray-300 text-gray-600 hover:border-gray-700 hover:text-gray-800 transition-all duration-300"
          >
            Add Option
          </Button>
        </Form.Item>
        {error && (
          <Alert message={error} type="error" showIcon className="mb-4" />
        )}
      </Form>
    </Modal>
  );
};

export default CreatePoll;
