import React, { useState } from "react";
import Modal from "antd/es/modal/Modal";
import { Form, Input, Button } from "antd";
import { DeleteButton } from "@refinedev/antd";

const CreateForm = ({ modalOpen, setModalOpen }) => {
  const [form] = Form.useForm();
  const [questionFields, setQuestionFields] = useState([{ key: 1 }]);
  const [nextKey, setNextKey] = useState(2); 

  const handleSubmit = () => {
    form.validateFields()
      .then((values) => {
        console.log("Form data:", values);
        setModalOpen(false);
        form.resetFields();
        setQuestionFields([{ key: nextKey }]); 
        setNextKey(2); 
      })
      .catch((info) => {
        console.log("Failed:", info);
      });
  };

  const addQuestionField = () => {
    setQuestionFields([...questionFields, { key: nextKey }]);
    setNextKey(nextKey + 1); 
  };

  const removeQuestionField = (key) => {
    setQuestionFields(questionFields.filter(field => field.key !== key));
  };

  return (
    <Modal
      title={"Add your Questions"}
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
          Submit
        </Button>
      ]}
      centered={true}
    >
      <Form form={form} layout="vertical" className="m-10">
        {questionFields.map((field, index) => (
          <Form.Item
            key={field.key}
            label={`Question ${index + 1}`}
            name={`question_${field.key}`}
            rules={[{ required: true, message: "Please input your question!" }]}
          >
            <div className="flex items-center">
              <Input
                style={{ width: 'calc(100% - 32px)', marginRight: '8px' }}
              />
              <button
                type="button"
                onClick={() => removeQuestionField(field.key)}
                className="text-red-500"
                aria-label="Delete"
              >
                <DeleteButton hideText />
              </button>
            </div>
          </Form.Item>
        ))}
        <Button type="dashed" onClick={addQuestionField} style={{ width: "100%", marginTop: "16px" }}>
          Add Question
        </Button>
      </Form>
    </Modal>
  );
};

export default CreateForm;
