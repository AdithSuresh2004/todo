import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import TodoPage from "./pages/TodoPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFoundpage from "./pages/NotFoundPage";
import TaskPage from "./pages/TaskPage";


const App = () => {
  return (
    <div className="min-h-screen bg-gray-200">
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/" element={<TodoPage />} />
        <Route path="todos/:todoId" element={<TaskPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundpage />} />
      </Routes>
    </div>
  );
};

export default App;
