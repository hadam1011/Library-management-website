import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "../pages/Login";
import HomePage from "../pages/Home";
import Error from "../pages/Error";
import AddBookForm from "../components/AddBookForm/addBookForm";
import SearchResult from "../components/SearchResult/searchResult";
import UserMangement from "../pages/User Management";

// const url = "https://hadam1011.github.io/Library-management-website";

function RouterPages() {
  return (
    <Router>
      <Routes>
        <Route path={`/`} element={<LoginForm />} />
        <Route path={`/home-page`} element={<HomePage />}>
          <Route path={`/home-page/add-book`} element={<AddBookForm />} />
          <Route path={`/home-page/search`} element={<SearchResult />} />
          <Route path={`/home-page/user-management`} element={<UserMangement />} />
        </Route> 
        <Route path="*" element={<Error />} /> 
      </Routes>
    </Router>
  );
}

export default RouterPages;
