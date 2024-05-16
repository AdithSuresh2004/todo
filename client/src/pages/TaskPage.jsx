import React, { useState } from "react";
import { useTasks } from "../hooks/useTask";
import TaskList from "../components/tasks/TaskList";
import { useParams } from "react-router-dom";
import DeleteTaskModal from "../components/tasks/modal/DeleteTaskModal";
import Loader from "../components/Loader";
import useEnterKeyPress from "../hooks/useEnterKeyPress";

const TaskPage = () => {
  const params = useParams();
  const { todoId } = params;
  const {
    tasks,
    isLoading,
    deleteOpen,
    handleDelete,
    handleDeleteCancel,
    handleDeleteSuccess,
    createTask,
    refetch,
  } = useTasks(todoId);
  const [newTask, setNewTask] = useState("");

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleAddTask = () => {
    if (newTask.trim()) {
      createTask({ body: newTask.trim(), completed: false, todoId });
      setNewTask("");
      refetch();
    }
  };

  useEnterKeyPress(handleAddTask);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="h-[calc(84vh-2rem)] flex justify-center mt-12">
      <DeleteTaskModal
        open={deleteOpen}
        handleCancel={handleDeleteCancel}
        onDeleteSuccess={handleDeleteSuccess}
      />
      <div className="bg-white max-h-full shadow-lg rounded-lg px-8 pt-6 pb-8 w-full sm:w-2/3 md:w-1/2 lg:w-1/3 mx-5">
        <h1 className="text-4xl font-semibold text-gray-800 mb-6 text-center">
          Task List
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
        <TaskList
          tasks={tasks}
          onDeleteTask={handleDelete}
        />
      </div>
    </div>
  );
};

export default TaskPage;