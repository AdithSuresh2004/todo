import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useTodoQuery } from "../store/slices/api/todoApiSlice";
import Loader from "../components/Loader";
import CreateTodoModal from "../components/CreateTodoModal";
import DeleteTodoModal from "../components/DeleteTodoModal"; 

const Home = () => {
  const [createOpen, setCreateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState(null); 
  const { data, isLoading } = useTodoQuery();
  const todos = data?.todos || [];
  const navigate = useNavigate();

  const handleCreateTodo = () => {
    setCreateOpen(true);
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    setSelectedTodoId(id); 
    setDeleteOpen(true);
  };

  const handleCreateCancel = () => {
    setCreateOpen(false);
  };

  const handleDeleteCancel = () => {
    setDeleteOpen(false);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="max-w-screen-lg mx-auto p-8 min-h-[calc(92vh-3rem)]">
      <CreateTodoModal open={createOpen} handleCancel={handleCreateCancel} />
      <DeleteTodoModal open={deleteOpen} handleCancel={handleDeleteCancel} todoId={selectedTodoId} />
      <h1 className="text-3xl font-semibold mb-6">All Todos</h1>
      {todos.length === 0 && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <h1 className="text-xl">No Todos Available</h1>
        </div>
      )}
      <div className="flex flex-wrap -mx-4">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8"
            onClick={() => navigate(`/${todo.id}`)}
          >
            <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-between">
              <h3 className="text-lg font-semibold my-2 cursor-pointer">
                {todo.title}
              </h3>
              <Button
                type="outlined"
                className="text-rose-800 hover:text-rose-600 hover:bg-gray-100"
                icon={<DeleteOutlined />}
                onClick={(e) => {
                  handleDelete(e, todo.id);
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-12 h-12 fixed bottom-8 right-8 flex items-center justify-center text-2xl"
        onClick={handleCreateTodo}
      >
        +
      </button>
    </div>
  );
};

export default Home;
