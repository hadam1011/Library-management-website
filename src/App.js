import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import LoginForm from "./components/Login/login";
import HomePage from "./components/Home/home";
import Error from "./components/Error";
import UserInfo from "./pages/userInfo";

function App() {
  const [username, setUserName] = useState('');

  return (
    <Routes>
      <Route path="/" element={<LoginForm setUser={setUserName} />} />
      <Route path="/Homepage" element={<HomePage username={username} />}>
        <Route path="/Homepage/userInfo" element={<UserInfo />}/>
      </Route>
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;
