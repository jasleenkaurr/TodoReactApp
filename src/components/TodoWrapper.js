// TodoWrapper.js
import React, { useState, useEffect } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(savedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo) => {
    if (todo.trim() === "") {
      alert("Task cannot be empty");
      return;
    }
    if (todos.some((t) => t.task === todo)) {
      alert("Task already exists");
      return;
    }
    setTodos([
      ...todos,
      { id: uuidv4(), task: todo, completed: false, isEditing: false },
    ]);
  };

  const deleteTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id));

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

const moveUp = (taskId) => {
  const index = todos.findIndex((todo) => todo.id === taskId);
  if (index > 0) {
    const newTodos = [...todos];
    [newTodos[index - 1], newTodos[index]] = [newTodos[index], newTodos[index - 1]];
    setTodos(newTodos);
  }
};

const moveDown = (taskId) => {
  const index = todos.findIndex((todo) => todo.id === taskId);
  if (index < todos.length - 1) {
    const newTodos = [...todos];
    [newTodos[index], newTodos[index + 1]] = [newTodos[index + 1], newTodos[index]];
    setTodos(newTodos);
  }
};

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "incomplete") return !todo.completed;
    return true;
  });

  const sortedTodos = [...filteredTodos].sort((a, b) => {
    if (sortOrder === "asc") return a.task.localeCompare(b.task);
    return b.task.localeCompare(a.task);
  });

  return (
    <div className="TodoWrapper">
      <h1>Get Things Done!</h1>
      <TodoForm addTodo={addTodo} />
      <div>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("incomplete")}>Incomplete</button>
        <button onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
          Sort {sortOrder === "asc" ? "Descending" : "Ascending"}
        </button>
      </div>
      {sortedTodos.map((todo, index) => (
        <Todo
          key={todo.id}
          task={todo}
          deleteTodo={deleteTodo}
          toggleComplete={toggleComplete}
          moveUp={() => moveUp(todo.id)}
          moveDown={() => moveDown(todo.id)}
        />
      ))}
    </div>
  );
};
