import React from "react";
import { Modal } from "antd";

const DeleteTaskModal = ({ open, handleCancel, onDeleteSuccess }) => {
  
  const handleSubmit = () => {
    onDeleteSuccess();
  };

  return (
    <Modal
      centered
      title={
        <p className="text-black/[.88] text-[22px] mb-5 font-bold">
          Delete Task
        </p>
      }
      open={open}
      onOk={handleSubmit}
      onCancel={handleCancel}
      okText="Delete"
      okButtonProps={{ danger: true }}
      cancelButtonProps={{ className: "bg-gray-200 hover:bg-gray-300" }}
    >
      <p className="mb-4">Are you sure you want to delete this task?</p>
    </Modal>
  );
};

export default DeleteTaskModal;