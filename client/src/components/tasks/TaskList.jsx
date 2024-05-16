import React, { useState, useEffect } from "react";
import { List, Pagination } from "antd";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, totalTasks, onDeleteTask }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    // Get the current page from localStorage on mount
    const storedPage = localStorage.getItem("currentPage");
    if (storedPage) {
      setCurrentPage(parseInt(storedPage));
    }
  }, []);

  useEffect(() => {
    // Store the current page in localStorage whenever it changes
    localStorage.setItem("currentPage", currentPage.toString());
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getVisibleTasks = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return tasks.slice(startIndex, endIndex);
  };

  return (
    <div className="flex h-[78%] flex-col">
      <div className="flex-grow overflow-auto">
        <List
          itemLayout="horizontal"
          dataSource={getVisibleTasks()}
          renderItem={(item, index) => (
            <TaskItem
              key={item.id}
              item={item}
              index={(currentPage - 1) * itemsPerPage + index + 1}
              onDeleteTask={onDeleteTask}
            />
          )}
        />
      </div>
      <div className="border-b border-gray-300 list-custom" />
      <div className="mt-4 flex justify-center">
        <Pagination
          current={currentPage}
          pageSize={itemsPerPage}
          total={tasks.length}
          onChange={handlePageChange}
          className="ant-pagination-custom"
        />
      </div>
    </div>
  );
};

export default TaskList;