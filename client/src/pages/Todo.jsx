import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  fetch("http://localhost:8000/addTask", {
    method: "POST",
    credentials: "include",
  });

  const handleAddTask = () => {
    if (newTask.trim()) {
      const task = {
        id: nanoid(6),
        task: newTask.trim(),
        completed: false,
      };
      setTasks([...tasks, task]);
      setNewTask("");
    } else {
      toast.error("Task cannot be blank");
    }
  };

  const handleToggleComplete = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        handleAddTask();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <div className="h-[calc(95vh-2rem)] flex justify-center mt-12">
      <div className="bg-white h-fit shadow-lg rounded-lg px-8 pt-6 pb-8 w-full sm:w-2/3 md:w-1/2 lg:w-1/3 mx-5">
        <h1 className="text-4xl font-semibold text-gray-800 mb-6 text-center">
          My Todo List
        </h1>
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Enter your task..."
            className="border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
            value={newTask}
            onChange={handleInputChange}
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 ml-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleAddTask}
          >
            Add
          </button>
        </div>
        <div className="overflow-auto max-h-96">
          {tasks.map((item, index) => (
            <div key={item.id}>
              <div className="flex items-center justify-between mb-2 p-2 rounded cursor-pointer hover:bg-gray-100">
                <div className="flex gap-3 items-center w-full">
                  <p className="text-stone-600">{index + 1}</p>
                  <input
                    type="checkbox"
                    checked={item.completed}
                    id={`item-${item.id}`}
                    className="h-4 w-4"
                    onChange={() => handleToggleComplete(item.id)}
                  />
                  <span
                    className={`${
                      item.completed ? "line-through text-gray-500" : ""
                    }`}
                  >
                    {item.task}
                  </span>
                  <span
                    className="text-rose-500 font-normal hover:text-rose-600 ml-auto mr-5 cursor-pointer"
                    onClick={() => handleDeleteTask(item.id)}
                  >
                    Delete
                  </span>
                </div>
              </div>
              {index !== tasks.length - 1 && (
                <hr className="border-gray-300 my-2" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Todo;
