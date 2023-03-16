import { Table, Space,InputNumber,Input, Form } from "antd";
import { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import "./content.css";

function Content() {
  const [bookList, setBookList] = useState([]);

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

  function handleUpdate(id) {
    console.log(id);
    var options = {
      method: "PUT",
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
      editable: true,
      key: "name"
    },
    {
      title: "Author",
      dataIndex: "author",
      editable: true,
      key:"author"
    },
    {
      title: "Category",
      dataIndex: "category",
      editable: true,
      key:"category"
    },
    {
      title: "Remain",
      dataIndex: "remain",
      editable: true,
      key:"remain"
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (record) => (
        <Space size="large">
          <DeleteOutlined
            style={{ fontSize: "20px" }}
            onClick={() => handleDelete(record.id)}
          />
          <EditOutlined
            style={{ fontSize: "20px" }}
            onClick={() => handleUpdate(record.id)}
          />
        </Space>
      ),
    },
  ];
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
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
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
  return (
    <Table
      columns={columns}
      components={{
        body: {
          cell: EditableCell,
        },
      }}
      expandable={{
        expandedRowRender: (record) => (
          <p style={{ margin: 0 }}>{record.description}</p>
        ),
        rowExpandable: (record) => record.name !== "Not Expandable",
      }}
      dataSource={bookList}
    />
  );
}

export default Content;
