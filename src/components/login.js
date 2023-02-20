import './login.css';

function HandleBtn() {
  alert(1);
}

function LoginForm() {
  return (
      <div className="box">
        <h2>Hệ thống quản lý thư viện</h2>
        <input type="text" placeholder="Tên đăng nhập" />
        <input type="password" placeholder="Mật khẩu" />
      <button className="login-btn" onClick={HandleBtn}>Đăng nhập</button>
      {/* cmt */}
      </div>
    );
}

export default LoginForm;