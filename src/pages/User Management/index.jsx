import { useEffect, useState } from "react";
import { Table } from "antd";

const api_url = "http://localhost:3000/user";

function UserMangement() {
  const [userList, setUserList] = useState([]);

  // call API to get user list
  useEffect(() => {
    async function getUserList() {
      const response = await fetch(api_url);
      var data = await response.json();
      setUserList(data);
    }
    getUserList();
  }, []);

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
      width: "6%",
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      width: "8%",
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
      render: (_, record) => {},
    },
  ];

  return (
    <>
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
