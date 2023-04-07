import { useEffect, useState } from "react";
import { Button, Table, Space, notification } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ModalForm from "../../components/ModalForm/modalForm";
import DrawerDetail from "../../components/DrawerDetail/drawerDetail";

const api_url = "http://localhost:3000/user";

function UserMangement() {
  const [userList, setUserList] = useState([]);
  const [isDrawerOpen, setDrawerOpen] = useState(false)
  const [isModalOpen, setModalOpen] = useState(false);
  const [userViewed, setUserViewed] = useState(JSON.parse(window.localStorage.getItem("user")));

  const [api, contextHolder] = notification.useNotification();

  // call API to get user list
  const fetchData = async () => {
    const response = await fetch(api_url);
    var data = await response.json();
    setUserList(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  // delete user
  const handleDelete = (id) => {
    var options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    async function fetchDelete() {
      await fetch(`${api_url}/${id}`, options)
        .then((res) => res.json())
        .then(() => fetchData())
    }

    fetchDelete();

    // delete notification
    api["success"]({
      message: "Deleted",
      description: "The data has been successfully deleted",
    });
  };

  const handleClickViewBtn = (record) => {
    setUserViewed(record);
    setDrawerOpen(true);
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "realName",
      key: "realName",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      width: "7%",
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      width: "9%",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Addess",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Action",
      dataIndex: "Action",
      render: (_, record) => {
        return (
          <Space size="small">
            <Button type="primary" onClick={() => handleClickViewBtn(record)}>View</Button>
            <Button
              type="primary"
              danger
              onClick={() => handleDelete(record.id)}
            >
              Delete
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
    <>
      {contextHolder}
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setModalOpen(true)}
        style={{ marginBottom: "1em" }}
      >
        Add new user
      </Button>
      <ModalForm
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
        userList={userList}
      />
      <DrawerDetail
        isOpen={isDrawerOpen}
        setOpen={setDrawerOpen}
        user={userViewed}
      />
      <Table
        rowKey={(record) => record.id}
        bordered
        dataSource={userList}
        columns={columns}
        rowClassName="editable-row"
        pagination={{
          hideOnSinglePage: true,
        }}
        scroll={{ y: 580 }}
      />
    </>
  );
}

export default UserMangement;
