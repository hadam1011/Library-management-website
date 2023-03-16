import { Outlet, useLocation } from "react-router-dom";
import { Layout, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useState } from "react";

import SideBar from "../../components/Home/sidebar";
import Contents from "../../components/Home/content";
import "./home.css";

const { Header, Content, Sider } = Layout;

function HomePage({ username }) {
  let location = useLocation();
  const checkLocation = location.pathname === "/home-page" ? true : false;

  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="home-container">
      <Layout>
        <Header className="header">
          <div className="logo">
            <h3>Library Manager</h3>
          </div>
          <div className="user-avatar">
            <Avatar size="large" icon={<UserOutlined />} />
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
