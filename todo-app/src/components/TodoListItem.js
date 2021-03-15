import React from 'react';
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdRemoveCircleOutline,
} from 'react-icons/md';
import './TodoListItem.scss';

const TodoListItem = ({todo, onToggle, onRemove }) => {
  return (
    <div className="TodoListItem">
      <span onClick={() => onToggle(todo.id)}>
        { todo.checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank /> }
        <span>{todo.text}</span>
      </span>

      <div className="remove" onClick={() => { onRemove(todo.id) }}>
        <MdRemoveCircleOutline />
      </div>
    </div>
  );
};

export default TodoListItem;
