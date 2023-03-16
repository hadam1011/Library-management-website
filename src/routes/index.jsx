import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import LoginForm from "../pages/Login";
import HomePage from "../pages/Home";
import Error from "../pages/Error";
import User from "../pages/User";
import AddBookForm from "../components/AddBookForm/addBookForm";

function RouterPages() {
  const [username, setUserName] = useState("");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm setUser={setUserName} />} />
        <Route path="/home-page" element={<HomePage username={username} />}>
          <Route path="/home-page/user" element={<User />} />
          <Route path="/home-page/add-book" element={<AddBookForm />} />
        </Route> 
        <Route path="*" element={<Error />} /> 
      </Routes>
    </Router>
  );
}

export default RouterPages;
