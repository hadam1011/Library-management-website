import { Routes, Route } from "react-router-dom";
import LoginForm from "./components/login";
import HomePage from "./components/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/Homepage" element={<HomePage />} />
    </Routes>
  );
}

export default App;
