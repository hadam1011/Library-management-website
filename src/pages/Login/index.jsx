import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const url = "https://hadam1011.github.io/Library-management-website";

function LoginForm() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [userList, setUserList] = useState([]);

  let success = false;
  const navigate = useNavigate();

  // call API to get user list
  useEffect(() => {
    fetch("http://localhost:3000/user")
      .then((res) => res.json())
      .then((list) => {
        setUserList(list);
      });
  }, []);

  const handleBtn = () => {
    userList.forEach((user) => {
      if (!success) {
        success = user.username === username && user.password === password ? true : false;
        if (success) {
          window.localStorage.setItem('user', JSON.stringify(user));
        }
      } 
    });

    if (success) {
      navigate(`${url}/home-page`);
    } else {
      alert("Sai thong tin hoac mat khau");
    }
  };

  return (
    <div className="body">
      <div className="box">
        <h2 id="login">Hệ thống quản lý thư viện</h2>
        <input
          id="login-page"
          type="text"
          placeholder="Tên đăng nhập"
          onChange={(e) => setUserName(e.target.value)}
          value={username}
        />
        <input
          id="login-page"
          type="password"
          placeholder="Mật khẩu"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button className="login-btn" onClick={handleBtn}>
          Đăng nhập
        </button>
      </div>
    </div>
  );
}

export default LoginForm;
