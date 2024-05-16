import React from "react";
import { Button } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const TodoItem = ({ todo, onDeleteTodo, onUpdateTodo }) => {
  
  const handleDelete = (e) => {
    e.stopPropagation();
    onDeleteTodo(todo.id);
  };

  const handleUpdate = (e) => {
    e.stopPropagation();
    onUpdateTodo(todo.id);
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-between">
      <h3 className="text-lg font-semibold my-2 pl-3 cursor-pointer">{todo.title}</h3>
      <div>
        <Button
          type="outlined"
          className="text-indigo-800 hover:text-indigo-600 hover:bg-gray-200 mr-2"
          icon={<EditOutlined />}
          onClick={handleUpdate}
        />
        <Button
          type="outlined"
          className="text-rose-800 hover:text-rose-600 hover:bg-gray-200"
          icon={<DeleteOutlined />}
          onClick={handleDelete}
        />
      </div>
    </div>
  );
};

export default TodoItem;