import React from "react";
import TodoItem from "./TodoItem";
import { useNavigate } from "react-router-dom";

const TodoList = ({ todos, onDeleteTodo, onUpdateTodo }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-wrap -mx-4">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="w-full md:w-1/2 lg:w-1/3 px-1.5 mb-3 cursor-pointer"
          onClick={() => navigate(`/todos/${todo.id}`)}
        >
          <TodoItem
            todo={todo}
            onDeleteTodo={onDeleteTodo}
            onUpdateTodo={onUpdateTodo}
          />
        </div>
      ))}
    </div>
  );
};

export default TodoList;
