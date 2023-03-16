import React, { useState, useEffect } from "react";
import { Form, InputNumber, Popconfirm, Table, Typography, Input } from "antd";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = title === "Remain" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
const App = () => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const [bookList, setBookList] = useState([]);

  // call API to get book list
  async function fetchData() {
    console.log("!23");
    await fetch("http://localhost:3000/books")
      .then((res) => res.json())
      .then((list) => {
        setBookList(list);
      });
  }

  useEffect(() => {
    async function fetchData() {
      console.log("!23");
      await fetch("http://localhost:3000/books")
        .then((res) => res.json())
        .then((list) => {
          console.log(list);
          setBookList(list);
        });
    }
    fetchData();
  }, []);

  const isEditing = (record) => record.key === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      author: "",
      category: "",
      remain: 0,
      ...record,
    });
    setEditingKey(record.key);
  };

  function handleUpdate(id, data) {
    var options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    async function fetchUpdate() {
      await fetch(`http://localhost:3000/books/${id}`, options)
        .then((res) => res.json())
        .then(() => {
          fetchData();
        });
    }
    fetchUpdate();
  }

  const cancel = () => {
    setEditingKey("");
  };
  const save = async (record) => {
    try {
      const row = await form.validateFields();
      const item =
        bookList[bookList.findIndex((item) => record.id === item.id)];
      handleUpdate(record.id, { ...item, ...row });
      setEditingKey("");
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
  function handleDelete(id) {
    var options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    async function fetchDelete() {
      await fetch(`http://localhost:3000/books/${id}`, options)
        .then((res) => res.json())
        .then(() => {
          fetchData();
        });
    }
    fetchDelete();
  }
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "25%",
      editable: true,
    },
    {
      title: "Author",
      width: "15%",
      editable: true,
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Category",
      dataIndex: "category",
      editable: true,
      key: "category",
      width: "20%",
    },
    {
      title: "Remain",
      dataIndex: "remain",
      editable: true,
      key: "remain",
      width: "20%",
    },
    {
      title: "Action",
      dataIndex: "Action",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <>
            <Typography.Link onClick={() => handleDelete(record.id)}>
              Delete
            </Typography.Link>
            <br />
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
            >
              Edit
            </Typography.Link>
          </>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={bookList}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
        expandable={{
          expandedRowRender: (record) => (
            <p style={{ margin: 0 }}>{record.description}</p>
          ),
          rowExpandable: (record) => record.name !== "Not Expandable",
        }}
      />
    </Form>
  );
};
export default App;
