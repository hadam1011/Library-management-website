import React from "react";
import { Button, Form, Input, InputNumber, notification } from "antd";

const { TextArea } = Input;

const AddBookForm = () => {
  const url = "http://localhost:3000/books";

  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  function handleCreate(data) {
    var options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    async function fetchCreate() {
      await fetch(url, options)
        .then((res) => res.json())
        .then();
    }
    fetchCreate();

    form.resetFields();

    // create notification
    api['success']({
      message: "Created",
      description:
        "New data has been successfully created",
    });
  }

  return (
    <>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
        form={form}
        onFinish={(value) => handleCreate(value)}
      >
        {contextHolder}
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: "Please enter a name",
            },
            {
              type: "string",
              whitespace: true,
              message: "Name can not be start with whitespace"
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="author"
          label="Author"
          rules={[
            {
              required: true,
              message: "Please enter author's name",
            },
            {
              type: "string",
              whitespace: true,
              message: "Author's name can not be start with whitespace"
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="category"
          label="Category"
          rules={[
            {
              required: true,
              message: "Please enter category",
            },
            {
              type: "string",
              whitespace: true,
              message: "Category can not be start with whitespace"
            },
            () => ({
              validator(_, value) {
                if (!/\d/.test(value)) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Please enter valid category'));
              },
            }),
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="remain"
          label="Remain"
          rules={[
            {
              required: true,
              message: "Please enter a number of books remainning",
            },
            {
              type: "number",
              min: 0,
              message: "Please enter a negative number"
            }
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[
            {
              required: true,
              message: "Please enter description",
            },
            {
              type: "string",
              whitespace: true,
              message: "Category can not be start with whitespace"
            }
          ]}
        >
          <TextArea rows={4} showCount maxLength={1000}/>
        </Form.Item>
        <Form.Item
          name="image"
          label="Image"
          extra="We need the link of an image"
          rules={[
            {
              required: true,
              message: "Please enter an url",
            },
            {
              type: "string",
              whitespace: true,
              message: "Url can not be start with whitespace"
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Button">
          <Button htmlType="submit">Create</Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddBookForm;
