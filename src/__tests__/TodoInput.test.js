import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import TodoInput from '../TodoInput';

describe('TodoInput', () => {
  describe('given a place to enter a task', () => {
    describe('when a user presses enter', () => {
      describe('and there is a task entered', () => {
        it('responds with the task name', () => {
          const todo = 'do the thing';
          const onTaskAdded = jest.fn();
          const { getByRole } = render(<TodoInput onTaskAdded={onTaskAdded} />);
          const input = getByRole('textbox');
          fireEvent.change(input, { target: { value: todo } });
          fireEvent.keyPress(input, { key: 'Enter', code: 13, charCode: 13 });

          expect(onTaskAdded).toHaveBeenCalledWith(todo);
        });

        it('clears the task input', () => {
          const todo = 'do the thing';
          const { getByRole } = render(<TodoInput />);
          const input = getByRole('textbox');
          fireEvent.change(input, { target: { value: todo } });
          expect(input).toHaveValue(todo);

          fireEvent.keyPress(input, { key: 'Enter', code: 13, charCode: 13 });
          expect(input).not.toHaveValue();
        });
      });

      describe('and no task is entered', () => {
        it('does not respond', () => {
          const onTaskAdded = jest.fn();
          const { getByRole } = render(<TodoInput onTaskAdded={onTaskAdded} />);
          const input = getByRole('textbox');
          fireEvent.keyPress(input, { key: 'Enter', code: 13, charCode: 13 });

          expect(onTaskAdded).not.toHaveBeenCalled();
        });
      });
    });
  });
});
