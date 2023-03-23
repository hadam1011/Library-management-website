import React, { useState, useEffect } from "react";
import { Button, Form, Input, InputNumber, notification } from "antd";

const { TextArea } = Input;

const AddBookForm = () => {
  const url = "http://localhost:3000/books";

  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  const [bookList, setBookList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await fetch(url)
        .then((res) => res.json())
        .then((list) => {
          setBookList(list);
        });
    }
    fetchData();
  }, []);

  function handleCreate(data) {
    var options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({...data, key:bookList[bookList.length - 1].id + 1}),
    };

    async function fetchCreate() {
      await fetch(url, options)
        .then((res) => res.json())
        .then();
    }
    fetchCreate();

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
              message: "Please enter a name"
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
              message: "Please enter author's name"
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
              message: "Please enter category"
            }
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
              message: "Please enter description"
            }
          ]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item label="Button">
          <Button htmlType="submit">Create</Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddBookForm;
