import React, { useState } from "react";
import Modal from "antd/es/modal/Modal";
import { Form, Input, Button } from "antd";
import { DeleteButton } from "@refinedev/antd";
import axios from "axios";

const CreatePoll = ({ modalOpen, setModalOpen }) => {
  const [form] = Form.useForm();
  const [optionFields, setOptionFields] = useState([{ key: 1 }]);
  const [nextKey, setNextKey] = useState(2);

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Form data:", values);
        setModalOpen(false);
        form.resetFields();
        setOptionFields([{ key: nextKey }]);
        setNextKey(2);

        // Send form data to the server
        axios
          .post(`${process.env.REACT_APP_API_URL}/api/v1/poll`, values)
          .then((response) => {
            console.log("Poll created:", response.data);
          });
      })
      .catch((info) => {
        console.log("Failed:", info);
      });
  };

  const addOptionField = () => {
    setOptionFields([...optionFields, { key: nextKey }]);
    setNextKey(nextKey + 1);
  };

  const removeOptionField = (key) => {
    setOptionFields(optionFields.filter((field) => field.key !== key));
  };

  return (
    <Modal
      title={"Create a Poll"}
      open={modalOpen}
      onCancel={() => {
        setModalOpen(false);
      }}
      footer={[
        <Button
          key="submit"
          type="primary"
          onClick={handleSubmit}
          className="bg-black text-white border-none"
        >
          Create Poll
        </Button>,
      ]}
      centered={true}
    >
      <Form form={form} layout="vertical" className="m-10">
        <Form.Item
          key={0}
          label={`Question`}
          name={`question`}
          rules={[{ required: true, message: "Please input your question!" }]}
        >
          <Input style={{ width: "calc(100% - 32px)", marginRight: "8px" }} />
        </Form.Item>
        {optionFields.map((field, index) => (
          <Form.Item
            key={field.key}
            label={`Option ${index + 1}`}
            name={`option_${field.key}`}
            rules={[{ required: true, message: "Please input your option!" }]}
          >
            <div className="flex items-center">
              <Input
                style={{ width: "calc(80% - 32px)", marginRight: "8px" }}
              />
              <button
                type="button"
                onClick={() => removeOptionField(field.key)}
                className="text-red-500"
                aria-label="Delete"
              >
                <DeleteButton hideText />
              </button>
            </div>
          </Form.Item>
        ))}
        <Button
          type="dashed"
          onClick={addOptionField}
          style={{ width: "100%", marginTop: "16px" }}
        >
          Add Option
        </Button>
      </Form>
    </Modal>
  );
};

export default CreatePoll;
