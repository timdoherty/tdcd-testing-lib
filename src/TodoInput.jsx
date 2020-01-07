import React, { useState } from 'react';
import PropTypes from 'prop-types';

function TodoInput(props) {
  const { onTaskAdded = () => {} } = props;
  const [todo, setTodo] = useState('');

  function onChange(e) {
    setTodo(e.target.value);
  }

  function onKeyPress(e) {
    if (e.key === 'Enter' && !!todo) {
      onTaskAdded(todo);
      setTodo('');
    }
  }
  return (
    <>
      <input value={todo} onChange={onChange} onKeyPress={onKeyPress} />
    </>
  );
}

TodoInput.propTypes = {};

TodoInput.defaultProps = {};

export default TodoInput;
