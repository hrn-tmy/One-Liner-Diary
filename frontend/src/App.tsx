import { BrowserRouter, Routes, Route } from "react-router-dom";
import Top from "./pages/Top";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import List from "./pages/diary/List";
import Create from "./pages/diary/Create";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Top />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/diary" element={<List />} />
        <Route path="/diary/create" element={<Create />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
