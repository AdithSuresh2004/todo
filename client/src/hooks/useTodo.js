import { useState } from "react";
import {
  useGetTodosQuery,
  useCreateTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from "../store/slices/api/todoApiSlice";

export const useTodo = () => {
  const [createOpen, setCreateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState(null);

  const { data, isLoading, refetch } = useGetTodosQuery();
  const todos = data?.todos || [];

  const [createTodo, { isLoading: isCreating }] = useCreateTodoMutation();
  const [deleteTodo, { isLoading: isDeleting }] = useDeleteTodoMutation();
  const [updateTodo, { isLoading: isUpdating }] = useUpdateTodoMutation();

  const handleCreateTodo = () => {
    setCreateOpen(true);
  };

  const handleDelete = (id) => {
    setSelectedTodoId(id);
    setDeleteOpen(true);
  };

  const handleUpdate = (id) => {
    setSelectedTodoId(id);
    setUpdateOpen(true);
  };

  const handleCreateCancel = () => {
    setCreateOpen(false);
  };

  const handleDeleteCancel = () => {
    setDeleteOpen(false);
  };

  const handleUpdateCancel = () => {
    setUpdateOpen(false);
  };

  const handleCreateSuccess = () => {
    refetch();
  };

  const handleDeleteSuccess = () => {
    refetch();
  };

  const handleUpdateSuccess = () => {
    refetch();
  };

  return {
    todos,
    isLoading,
    isCreating,
    isDeleting,
    isUpdating,
    createOpen,
    deleteOpen,
    updateOpen,
    selectedTodoId,
    handleCreateTodo,
    handleDelete,
    handleUpdate,
    handleCreateCancel,
    handleDeleteCancel,
    handleUpdateCancel,
    handleCreateSuccess,
    handleDeleteSuccess,
    handleUpdateSuccess,
    createTodo,
    deleteTodo,
    updateTodo,
  };
};