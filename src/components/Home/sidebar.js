import {
  ContainerOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Button, Menu } from "antd";
import './sidebar.css'

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem("Option 1", "1", <PieChartOutlined />),
  getItem("Option 2", "2", <DesktopOutlined />),
  getItem("Option 3", "3", <ContainerOutlined />),
];

function SideBar({ collapsed, setCollapsed }) {
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{
          marginBottom: 16,
        }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="dark"
        items={items}
      />
    </div>
  );
}

export default SideBar;
