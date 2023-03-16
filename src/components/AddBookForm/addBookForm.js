import React from "react";
import "./addBookForm.css";
import { Button, Form, Input, InputNumber, Select } from "antd";
const { TextArea } = Input;

const FormAddBook = () => {
  return (
    <div className="update-form">
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
      >
        <Form.Item label="Input">
          <Input />
        </Form.Item>
        <Form.Item label="Select">
          <Select>
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="InputNumber">
          <InputNumber />
        </Form.Item>
        <Form.Item label="TextArea">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item label="Button">
          <Button>Button</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormAddBook;
