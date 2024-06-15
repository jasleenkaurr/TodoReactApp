import React, { useState, useEffect } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { EditTodoForm } from "./EditTodoForm";
import { v4 as uuidv4 } from "uuid";

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setTodos(storedTodos);
      setFilteredTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo) => {
    if (todo.trim() !== "") {
      const newTodos = [
        ...todos,
        { id: uuidv4(), task: todo, completed: false, isEditing: false },
      ];
      setTodos(newTodos);
      setFilteredTodos(newTodos);
    }
  };

  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    setFilteredTodos(newTodos);
  };

  const toggleComplete = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
    setFilteredTodos(newTodos);
  };

  const editTodo = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
    );
    setTodos(newTodos);
    setFilteredTodos(newTodos);
  };

  const editTask = (task, id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
    );
    setTodos(newTodos);
    setFilteredTodos(newTodos);
  };

  const sortTodos = () => {
    const newTodos = [...filteredTodos].sort((a, b) =>
      a.task.localeCompare(b.task)
    );
    setFilteredTodos(newTodos);
  };

  const filterCompleted = () => {
    setFilteredTodos(todos.filter((todo) => todo.completed));
  };

  const resetFilter = () => {
    setFilteredTodos(todos);
  };

  return (
    <div className="TodoWrapper">
      <h1>Get Things Done!</h1>
      <TodoForm addTodo={addTodo} />
      <div className="action-buttons">
        <button onClick={sortTodos}>Sort Tasks</button>
        <button onClick={filterCompleted}>Show Completed</button>
        <button onClick={resetFilter}>Show All</button>
      </div>
      {filteredTodos.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm key={todo.id} editTodo={editTask} task={todo} />
        ) : (
          <Todo
            key={todo.id}
            task={todo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            toggleComplete={toggleComplete}
          />
        )
      )}
    </div>
  );
};
