import React from 'react';
import PropTypes from 'prop-types';

function Todo(props) {
  const {
    todo,
    isComplete,
    onCompletedToggled = () => {},
    onDeleted = () => {},
  } = props;

  function onChange(e) {
    onCompletedToggled(todo);
  }

  function onDeleteClick(e) {
    onDeleted(todo);
  }

  return (
    <>
      <span>{todo}</span>
      <input type="checkbox" checked={isComplete} onChange={onChange} />
      <button onClick={onDeleteClick}>Delete</button>
    </>
  );
}

Todo.propTypes = {};

Todo.defaultProps = {};

export default Todo;
