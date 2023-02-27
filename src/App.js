import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import LoginForm from "./components/Login/login";
import HomePage from "./components/Home/home";

function App() {
  const [username, setUserName] = useState('');

  return (
    <Routes>
      <Route path="/" element={<LoginForm setUser={setUserName} />} />
      <Route path={`/Homepage/${username}`} element={<HomePage />} />
    </Routes>
  );
}

export default App;
