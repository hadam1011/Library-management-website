import {
  MenuFoldOutlined,
  HomeOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  BookOutlined
} from "@ant-design/icons";
import { Button, Menu } from "antd";
import { useNavigate } from "react-router-dom";
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
  getItem("Home", "1", <HomeOutlined />),
  getItem("Add Book", "2", <BookOutlined />),
  getItem("User Management", "3", <UserOutlined />),
];

function SideBar({ collapsed, setCollapsed }) {
  const navigate = useNavigate();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  function handleClickItems(item) {
    if (item.key === "1") {
      navigate("/home-page");
    } else if (item.key === "2") {
      navigate("/home-page/add-book");
    } else if (item.key === "3") {
      navigate("/home-page/user-management");
    }
  }

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
        onClick={(item) => handleClickItems(item)}
        items={items}
      />
    </div>
  );
}

export default SideBar;
