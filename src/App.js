import { Routes, Route } from "react-router-dom";
import LoginForm from "./components/login";

function App() {
  return (
    <Routes>
      <Route path="/" element = {<LoginForm />} />
    </Routes>
  );
}

export default App;
