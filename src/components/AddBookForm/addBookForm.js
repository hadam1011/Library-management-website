import React, { useState } from "react";
import { Button, Form, Input, InputNumber } from "antd";

const { TextArea } = Input;

const AddBookForm = () => {
  const url = "http://localhost:3000/books";

  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [remain, setRemain] = useState(0);
  const [description, setDescription] = useState("");

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
  }

  var newData = {
    name: bookName,
    author: author,
    category: category,
    remain: remain,
    description: description,
  }

  return (
    <>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
      >
        <Form.Item label="Name">
          <Input onChange={(e) => setBookName(e.target.value)}/>
        </Form.Item>
        <Form.Item label="Author">
          <Input onChange={(e) => setAuthor(e.target.value)}/>
        </Form.Item>
        <Form.Item label="Category">
          <Input onChange={(e) => setCategory(e.target.value)}/>
        </Form.Item>
        <Form.Item label="Remain">
          <InputNumber onChange={(e) => setRemain(e)}/>
        </Form.Item>
        <Form.Item label="Description">
          <TextArea
            rows={4}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Button">
          <Button onClick={() => handleCreate(newData)}>Create</Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddBookForm;
