import { useState } from "react";
import {
  useGetTasksQuery,
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from "../store/slices/api/taskApiSlice";
import { useParams } from "react-router-dom";

export const useTasks = () => {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const params = useParams();
  const { todoId } = params;
  const [selectedTask, setSelectedTask] = useState(null);
  const {
    data: { tasks = [], totalTasks = 0 } = {},
    isLoading,
    refetch,
  } = useGetTasksQuery(todoId);
  const [createTask] = useCreateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  const handleDelete = (id) => {
    setDeleteOpen(true);
    setSelectedTask(id);
  };

  const handleDeleteCancel = () => {
    setDeleteOpen(false);
  };

  const handleDeleteSuccess = (id) => {
    deleteTask(selectedTask);
    refetch();
    setDeleteOpen(false);
  };

  return {
    tasks,
    totalTasks,
    isLoading,
    deleteOpen,
    updateTask,
    handleDelete,
    handleDeleteCancel,
    handleDeleteSuccess,
    createTask,
    refetch,
  };
};
