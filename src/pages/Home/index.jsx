import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Layout, Avatar, Dropdown, theme, Modal } from "antd";
import {
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";

import SideBar from "../../components/Home/sidebar";
import Contents from "../../components/Home/content";
import InfoModal from "../../components/InformationModal/infoModal";
import "./home.css";

const { Header, Content, Sider } = Layout;
// const url = "https://hadam1011.github.io/Library-management-website";

const itemsDropdown = [
  {
    key: "1",
    label: "Admin information",
  },
  {
    key: "2",
    label: "Log out",
  },
];

function HomePage() {
  let location = useLocation();
  const checkLocation = location.pathname === `/home-page` ? true : false;
  const user = JSON.parse(window.localStorage.getItem("user"));

  const [modal, contextHolder] = Modal.useModal();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const confirm = () => {
    modal.confirm({
      title: "Confirm",
      content: "Are you sure you want to log out?",
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        navigate("/");
        window.localStorage.clear();
      },
    });
  };

  function handleClickDropdownItem(item) {
    if (item.key === "1") {
      setIsModalOpen(true);
    } else if (item.key === "2") {
      confirm();
    }
  }

  return (
    <div className="home-container">
      <InfoModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        user={user}
      />
      <Layout>
        {contextHolder}
        <Sider collapsed={collapsed} trigger={null} collapsible>
          <SideBar />
        </Sider>
        <Layout>
          <Layout>
            <Header className="header" style={{ background: colorBgContainer }}>
              {React.createElement(
                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: "trigger",
                  onClick: () => setCollapsed(!collapsed),
                }
              )}
              <div className="user-avatar">
                <Dropdown
                  menu={{
                    items: itemsDropdown,
                    selectable: true,
                    onClick: handleClickDropdownItem,
                  }}
                >
                  <Avatar size="large" icon={<UserOutlined />} />
                </Dropdown>
              </div>
            </Header>
            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              {checkLocation && <Contents />}
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
}

export default HomePage;
