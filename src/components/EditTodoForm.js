import React, { useState } from "react";

export const EditTodoForm = ({ editTodo, task }) => {
  const [newTask, setNewTask] = useState(task.task);

  const handleSubmit = (e) => {
    e.preventDefault();
    editTodo(newTask, task.id);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button type="submit">Update Task</button>
    </form>
  );
};
