import React from "react";

export const Todo = ({ task, deleteTodo, editTodo, toggleComplete }) => {
  return (
    <div className="Todo">
      <span
        style={{
          textDecoration: task.completed ? "line-through" : "none",
        }}
        onClick={() => toggleComplete(task.id)}
      >
        {task.task}
      </span>
      <button onClick={() => editTodo(task.id)}>Edit</button>
      <button onClick={() => deleteTodo(task.id)}>Delete</button>
    </div>
  );
};
