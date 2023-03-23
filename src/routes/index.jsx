import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "../pages/Login";
import HomePage from "../pages/Home";
import Error from "../pages/Error";
import User from "../pages/User";
import AddBookForm from "../components/AddBookForm/addBookForm";

function RouterPages() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/home-page" element={<HomePage />}>
          <Route path="/home-page/user" element={<User />} />
          <Route path="/home-page/add-book" element={<AddBookForm />} />
        </Route> 
        <Route path="*" element={<Error />} /> 
      </Routes>
    </Router>
  );
}

export default RouterPages;
