import { Outlet, useLocation } from "react-router-dom";
import { Breadcrumb, Layout, Menu } from "antd";
import { useState } from "react";

import Nav from "../../components/Home/navbar";
import SideBar from "../../components/Home/sidebar";
import Contents from "../../components/Home/content2";
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
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            // items={items1}
          />
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
            <Breadcrumb
              style={{
                margin: "16px 0",
              }}
            >
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
}

export default HomePage;
