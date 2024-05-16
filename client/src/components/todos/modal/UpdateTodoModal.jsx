import { Modal } from "antd";
import React, { useState } from "react";
import { toast } from "react-toastify";
import useEnterKeyPress from "../../../hooks/useEnterKeyPress";

const UpdateTodoModal = ({
  open,
  handleCancel,
  todoId,
  onUpdateSuccess,
  updateTodo,
}) => {
  const [title, setTitle] = useState("");

  const handleUpdateTodo = async () => {
    if (!open) return;
    
    if (title.trim() === "") {
      toast.error("Please enter a title.");
      return;
    }

    try {
      await updateTodo({ todoId, title }).unwrap();
      setTitle("");
      handleCancel();
      onUpdateSuccess();
    } catch (error) {
      toast.error("Failed to update todo. Please try again.");
    }
  };

  useEnterKeyPress(handleUpdateTodo);

  return (
    <Modal
      centered
      title={
        <p className="text-black/[.88] text-[22px] mb-5 font-bold">
          Update Todo
        </p>
      }
      className="text-2xl"
      open={open}
      onOk={handleUpdateTodo}
      onCancel={handleCancel}
    >
      <div>
        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
          Title
        </label>
        <input
          className="border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline text-[16px]"
          id="title"
          type="text"
          placeholder="Enter new title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
    </Modal>
  );
};

export default UpdateTodoModal;
