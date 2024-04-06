import { Route, Routes } from "react-router-dom";
import "./App.css";

import { AuthProvider } from "./context/AuthContext";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Display from "./pages/Display";
import { TodoProvider } from "./context/TaskContext";
import Create from "./pages/Create";
import Update from "./pages/Update";

function App() {
  return (
    <>
      <AuthProvider>
        <TodoProvider>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Login />} />
            <Route path="/tasks" element={<Display />} />
            <Route path="/create" element={<Create />} />
            <Route path="/update/:id" element={<Update />} />
          </Routes>
        </TodoProvider>
      </AuthProvider>
    </>
  );
}

export default App;
