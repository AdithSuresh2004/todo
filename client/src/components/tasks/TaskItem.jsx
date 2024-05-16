import React, { useState, useEffect } from "react";
import { List, Input, Button, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useTasks } from "../../hooks/useTask";

const TaskItem = ({ item, index, onDeleteTask }) => {
  const { updateTask, refetch } = useTasks();
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTask, setEditedTask] = useState(item.body);
  const [taskCompleted, setTaskCompleted] = useState(item.completed);

  const handleToggleComplete = () => {
    setTaskCompleted(!taskCompleted);
    const updatedTask = { ...item, completed: !taskCompleted };
    updateTask({ taskId: item.id, updatedTask });
    refetch();
  };

  const handleDeleteTask = (id) => {
    onDeleteTask(id);
  };

  const handleUpdateTask = () => {
    if (editedTask.trim() !== item.body.trim()) {
      const updatedTaskItem = { ...item, body: editedTask.trim() };
      setEditedTask(updatedTaskItem.body);

      // Update the task on the server
      const updatedTask = { ...item, body: editedTask.trim() };
      updateTask({ taskId: item.id, updatedTask });
      refetch();
      window.location.reload();
    }
    setEditingTaskId(null);
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditedTask(item.body);
  };

  return (
    <List.Item>
      <div className="flex items-center justify-between w-full">
        <div className="flex gap-3 items-center">
          <p className="text-stone-600">{index}</p>
          <input
            type="checkbox"
            checked={taskCompleted}
            id={`item-${item.id}`}
            className="h-4 w-4"
            onChange={handleToggleComplete}
          />
          {editingTaskId === item.id ? (
            <div className="flex items-center gap-2">
              <Input
                value={editedTask}
                onChange={(e) => setEditedTask(e.target.value)}
                className="mr-2"
              />
              <Button type="primary" onClick={handleUpdateTask}>
                Save
              </Button>
              <Button onClick={handleCancelEdit}>Cancel</Button>
            </div>
          ) : (
            <span
              className={`${taskCompleted ? "line-through text-gray-500" : ""}`}
              onClick={() => setEditingTaskId(item.id)}
            >
              {item.body}
            </span>
          )}
        </div>
        <Space>
          <EditOutlined
            onClick={() => setEditingTaskId(item.id)}
            className="text-blue-500 cursor-pointer"
          />
          <DeleteOutlined
            onClick={() => handleDeleteTask(item.id)}
            className="text-rose-500 cursor-pointer"
          />
        </Space>
      </div>
    </List.Item>
  );
};

export default TaskItem;
