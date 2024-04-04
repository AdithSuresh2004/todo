import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useCreateTodoMutation } from "../store/slices/api/todoApiSlice";

const CreateTodoModal = ({ open, handleCancel }) => {
  const [title, setTitle] = useState("");
  const [createTodo] = useCreateTodoMutation();

  const handleCreateTodo = async () => {
    if (title.trim() === "") {
      toast.error("Please enter a title.");
      return;
    }

    await createTodo(title);
    window.location.reload();
    setTitle("");
    handleCancel();
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        handleCreateTodo(e);
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
        <p className="text-black/[.88] text-[22px] mb-5 font-bold">New Todo</p>
      }
      className="text-2xl"
      open={open}
      onOk={handleCreateTodo}
      onCancel={handleCancel}
    >
      <input
        className="border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline text-[16px]"
        id="todo"
        type="text"
        placeholder="Enter todo list title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </Modal>
  );
};

export default CreateTodoModal;
