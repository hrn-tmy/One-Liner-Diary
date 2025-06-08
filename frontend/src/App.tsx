import { BrowserRouter, Routes, Route } from "react-router-dom";
import Top from "./pages/Top";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import List from "./pages/diary/List";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Top />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/list" element={<List />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
