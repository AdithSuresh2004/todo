import { Modal } from "antd";
import React from "react";
import { toast } from "react-toastify";
import useEnterKeyPress from "../../../hooks/useEnterKeyPress";

const DeleteTodoModal = ({ open, handleCancel, todoId, onDeleteSuccess, deleteTodo }) => {

  const handleDeleteTodo = async () => {
    if (!open) return;
    try {
      await deleteTodo(todoId);
      handleCancel();
      onDeleteSuccess();
    } catch (error) {
      toast.error("Failed to delete todo. Please try again.");
    }
  };

  useEnterKeyPress(handleDeleteTodo);

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