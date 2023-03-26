import React, { useState, useEffect } from "react";
import {
  Form,
  InputNumber,
  Popconfirm,
  Table,
  Typography,
  Input,
  Space,
  notification,
  Image,
  Col,
  Row,
} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import "./content.css";

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

function Contents() {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const [bookList, setBookList] = useState([]);
  const [api, contextHolder] = notification.useNotification();

  // call API to get book list
  async function fetchData() {
    await fetch("http://localhost:3000/books")
      .then((res) => res.json())
      .then((list) => {
        setBookList(list);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  const isEditing = (record) => record.id === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      author: "",
      category: "",
      remain: 0,
      ...record,
    });
    setEditingKey(record.id);
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

    // update notification
    api["success"]({
      message: "Updated",
      description: "The data has been successfully updated",
    });
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

    // delete notification
    api["success"]({
      message: "Deleted",
      description: "The data has been successfully deleted",
    });
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      editable: true,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Author",
      editable: true,
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Category",
      dataIndex: "category",
      editable: true,
      key: "category",
    },
    {
      title: "Remain",
      dataIndex: "remain",
      editable: true,
      key: "remain",
      sorter: (a, b) => a.remain - b.remain,
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
              <Typography.Link>Cancel</Typography.Link>
            </Popconfirm>
          </span>
        ) : (
          <Space size="large">
            <Popconfirm
              title="Are you sure you want to delete this book?"
              onConfirm={() => handleDelete(record.id)}
            >
              <DeleteOutlined style={{ fontSize: "20px" }} />
            </Popconfirm>
            <EditOutlined
              style={{ fontSize: "20px" }}
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
            />
          </Space>
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
      {contextHolder}
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
          hideOnSinglePage: true
        }}
        scroll={{ y: 580 }}
        expandable={{
          expandRowByClick: true,
          expandedRowRender: (record) => (
            <Row>
              <Col span={3}>
                <Image height={"10em"} src={record.image} />
              </Col>
              <Col span={21}>
                <p style={{ margin: 0 }}>{record.description}</p>
              </Col>
            </Row>
          ),
        }}
      />
    </Form>
  );
}

export default Contents;
