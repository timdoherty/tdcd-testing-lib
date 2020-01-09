import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Todo from './Todo';
import TodoInput from './TodoInput';
import BottomNav from './BottomNav';

const views = ['all', 'active', 'done'];

function Todos(props) {
  const [todos, setTodos] = useState(new Map(props.todos || []));

  function onInputChanged(task) {
    setTodos(new Map(todos.set(task, false)));
  }

  function deleteTask(task) {
    const newTodos = new Map(todos);
    newTodos.delete(task);
    setTodos(newTodos);
  }

  function onViewChanged(view) {
    const newTodos = new Map(
      [...todos.entries()].filter(([key, value]) => {
        switch (view) {
          case 'active':
            return !!value;
          case 'done':
            return value === false;
          default:
            return true;
        }
      })
    );
    setTodos(newTodos);
  }

  return (
    <>
      <TodoInput onTaskAdded={onInputChanged} />
      {[...todos.entries()].map(([key, value]) => (
        <Todo key={key} todo={key} isComplete={value} onDeleted={deleteTask} />
      ))}
      <BottomNav options={views} onNavigationChanged={onViewChanged} />
    </>
  );
}

Todos.propTypes = {};

Todos.defaultProps = {};

export default Todos;
