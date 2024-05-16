import { Modal } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";
import useEnterKeyPress from "../../../hooks/useEnterKeyPress";

const CreateTodoModal = ({
  createTodo,
  open,
  handleCancel,
  onCreateSuccess,
}) => {
  const [title, setTitle] = useState("");

  const handleCreateTodo = async () => {
    if (!open) return;
    
    if (title.trim() === "") {
      toast.error("Please enter a title.");
      return;
    }


    try {
      await createTodo(title);
      setTitle("");
      handleCancel();
      onCreateSuccess();
    } catch (error) {
      toast.error("Failed to create todo. Please try again.");
    }
  };

  useEnterKeyPress(handleCreateTodo);

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
