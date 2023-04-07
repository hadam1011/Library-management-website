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
  getItem("Search", "3", <SearchOutlined />),
  // getItem("User Management", "4", <UserOutlined />),
];

var display_items = []

function SideBar() {
  const navigate = useNavigate();
  const location = useLocation();
  let currentKey = "1";

  // check user's role
  const user = JSON.parse(window.localStorage.getItem("user"));
  if (user.role === "manager") {
    display_items = [...items, getItem("User Management", "4", <UserOutlined />)];
  } else {
    display_items = items;
  }

  function checkLocation() {
    if (location.pathname === `/home-page`) {
      currentKey = "1";
    } else if (location.pathname === `/home-page/add-book`) {
      currentKey = "2";
    } else if (location.pathname === `/home-page/search`) {
      currentKey = "3";
    } else if (location.pathname === `/home-page/user-management`) {
      currentKey = "4";
    }
  }

  function handleClickItems(item) {
    if (item.key === "1") {
      navigate(`/home-page`);
    } else if (item.key === "2") {
      navigate(`/home-page/add-book`);
    } else if (item.key === "3") {
      navigate(`/home-page/search`);
    } else if (item.key === "4") {
      navigate(`/home-page/user-management`);
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
        items={display_items}
      />
    </div>
  );
}

export default SideBar;
