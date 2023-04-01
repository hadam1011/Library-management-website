import {
  HomeOutlined,
  UserOutlined,
  BookOutlined,
  SearchOutlined,
  ReadOutlined
} from "@ant-design/icons";
import { Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import "./sidebar.css";

// const url = "https://hadam1011.github.io/Library-management-website";

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
  getItem("Search", "4", <SearchOutlined />),
];

function SideBar() {
  const navigate = useNavigate();
  const location = useLocation();
  let currentKey = "1";

  function checkLocation() {
    if (location.pathname === `/home-page`) {
      currentKey = "1";
    } else if (location.pathname === `/home-page/add-book`) {
      currentKey = "2";
    } else if (location.pathname === `/home-page/user-management`) {
      currentKey = "3";
    } else if (location.pathname === `/home-page/search`) {
      currentKey = "4";
    }
  }

  function handleClickItems(item) {
    if (item.key === "1") {
      navigate(`/home-page`);
    } else if (item.key === "2") {
      navigate(`/home-page/add-book`);
    } else if (item.key === "3") {
      navigate(`/home-page/user-management`);
    } else if (item.key === "4") {
      navigate(`/home-page/search`);
    }
  }

  checkLocation();

  return (
    <div>
      <div className="logo">
        <ReadOutlined style={{
          fontSize: "2.5em",
          color: "white",
          marginLeft: "0.25em"
        }} />
      </div>
      <Menu
        defaultSelectedKeys={[currentKey]}
        mode="inline"
        theme="dark"
        onClick={(item) => handleClickItems(item)}
        items={items}
      />
    </div>
  );
}

export default SideBar;
