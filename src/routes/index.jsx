import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "../pages/Login";
import HomePage from "../pages/Home";
import Error from "../pages/Error";
import User from "../pages/User";
import AddBookForm from "../components/AddBookForm/addBookForm";
import SearchResult from "../components/SearchResult/searchResult";

const url = "https://hadam1011.github.io/Library-management-website";

function RouterPages() {
  return (
    <Router>
      <Routes>
        <Route path={`${url}/`} element={<LoginForm />} />
        <Route path={`${url}/home-page`} element={<HomePage />}>
          <Route path={`${url}/home-page/user`} element={<User />} />
          <Route path={`${url}/home-page/add-book`} element={<AddBookForm />} />
          <Route path={`${url}/home-page/search`} element={<SearchResult />} />
        </Route> 
        <Route path="*" element={<Error />} /> 
      </Routes>
    </Router>
  );
}

export default RouterPages;
