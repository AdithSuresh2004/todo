import { Modal } from "antd";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useDeleteTodoMutation } from "../store/slices/api/todoApiSlice";

const DeleteTodoModal = ({ open, handleCancel, todoId }) => {
  const [deleteTodo] = useDeleteTodoMutation();

  const handleDeleteTodo = async () => {
    try {
      await deleteTodo(todoId);
      window.location.reload();
      handleCancel();
    } catch (error) {
      toast.error("Failed to delete todo. Please try again.");
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        handleDeleteTodo();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <Modal
      centered
      title={
        <p className="text-black/[.88] text-[22px] mb-5 font-bold">
          Delete Todo
        </p>
      }
      className="text-2xl"
      open={open}
      onOk={handleDeleteTodo}
      onCancel={handleCancel}
    >
      <p>Are you sure you want to delete this todo?</p>
    </Modal>
  );
};

export default DeleteTodoModal;
