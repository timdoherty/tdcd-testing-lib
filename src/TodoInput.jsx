import React, { useState } from 'react';
import PropTypes from 'prop-types';

function TodoInput(props) {
  const [value, setValue] = useState('');
  return (
    <input
      value={value}
      onChange={e => setValue(e.target.value)}
      onKeyUp={e => {
        if (e.key === 'Enter' && value) {
          props.onKeyUp(value);
          setValue('');
        }
      }}
    />
  );
}

TodoInput.propTypes = {
  onKeyUp: PropTypes.func.isRequired,
};

export default TodoInput;
