import React from 'react';
import createFragment from 'react-addons-create-fragment';
import PropTypes from 'prop-types';

function BottomNav(props) {
  const { options = [], onNavigationChanged = () => {}, selected = '' } = props;

  function onChange(e) {
    onNavigationChanged(e.target.value);
  }

  return (
    <>
      {options.map(opt => {
        return createFragment({
          [opt]: (
            <input
              key={opt}
              type="radio"
              id={opt}
              value={opt}
              name="selectedView"
              onChange={onChange}
              checked={selected === opt}
            />
          ),
          [`${opt}-label`]: <label htmlFor={opt}>{opt}</label>,
        });
      })}
    </>
  );
}

BottomNav.propTypes = {};

BottomNav.defaultProps = {};

export default BottomNav;
