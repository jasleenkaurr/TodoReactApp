import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash, faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

export const Todo = ({ task, deleteTodo, editTodo, toggleComplete, moveUp, moveDown }) => {
  const handleMoveUp = () => {
    console.log("Moving up task:", task.id);
    moveUp();
  };

  const handleMoveDown = () => {
    console.log("Moving down task:", task.id);
    moveDown();
  };

  return (
    <div className="Todo">
      <p className={`${task.completed ? "completed" : "incompleted"}`} onClick={() => toggleComplete(task.id)}>
        {task.task}
      </p>
      <div>
        <FontAwesomeIcon className="edit-icon" icon={faPenToSquare} onClick={() => editTodo(task.id)} />
        <FontAwesomeIcon className="delete-icon" icon={faTrash} onClick={() => deleteTodo(task.id)} />
        <FontAwesomeIcon className="move-up-icon" icon={faArrowUp} onClick={handleMoveUp} />
        <FontAwesomeIcon className="move-down-icon" icon={faArrowDown} onClick={handleMoveDown} />
      </div>
    </div>
  );
};
