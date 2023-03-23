import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Layout, Avatar, Dropdown } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useState } from "react";

import SideBar from "../../components/Home/sidebar";
import Contents from "../../components/Home/content";
import InfoModal from "../../components/InformationModal/infoModal";
import "./home.css";

const { Header, Content, Sider } = Layout;

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
  const checkLocation = location.pathname === "/home-page" ? true : false;
  const user = JSON.parse(window.localStorage.getItem("user"));

  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleClickDropdownItem(item) {
    if (item.key === "1") {
      setIsModalOpen(true);
    } else if (item.key === "2") {
      navigate("/");
      window.localStorage.clear();
    }
  }
  return (
    <div className="home-container">
      <InfoModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} user={user}/>
      <Layout>
        <Header className="header">
          <div className="logo">
            <h3>Library Manager</h3>
          </div>
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
        <Layout>
          <Sider collapsed={collapsed}>
            <SideBar collapsed={collapsed} setCollapsed={setCollapsed} />
          </Sider>
          <Layout
            style={{
              padding: "0 24px 24px",
            }}
          >
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
