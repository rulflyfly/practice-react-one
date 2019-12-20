import React from 'react';

import TodoListItem from '../todo-list-item/todo-list-item';
import './todo-list.css';

const TodoList = ({todos, onDeleted,
                   onToggleImportant,
                   onToggleDone}) => {

    const elements = todos.map( item => {
        const {id, ...itemProps} = item;
        return (
        <li key = {id} className = "list-group-item p-2">
            <TodoListItem {...itemProps}
            onDeleted={() => onDeleted(id)}
            onToggleImportant={() => onToggleImportant(id)}
            onToggleDone={() => onToggleDone(id)}
            />
        </li>
            );
    })

    return (
        <ul className = "list-group todo-list mt-2">
            {elements}
        </ul>
    );
};

export default TodoList;