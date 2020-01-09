import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Todos from '../Todos';

const todos = new Map([
  ['foo', false],
  ['bar', true],
  ['baz', false],
  ['bim', false],
]);

describe('Todos', () => {
  describe('given a list of tasks', () => {
    describe('when displayed', () => {
      it('shows each task in the list', () => {
        const { getAllByRole, debug } = render(<Todos todos={todos} />);
        // debug();
        const checkboxes = getAllByRole('checkbox');
        expect(checkboxes).toHaveLength(todos.size);
      });
    });

    describe('when a user chooses to add a new task', () => {
      it('displays the new task', () => {
        const todo = 'do the thing!';
        const { getByLabelText, getByRole, getAllByRole, debug } = render(
          <Todos todos={todos} />
        );
        const input = getByRole('textbox');
        fireEvent.change(input, { target: { value: todo } });
        fireEvent.keyPress(input, { key: 'Enter', code: 13, charCode: 13 });

        const checkboxes = getAllByRole('checkbox');
        expect(checkboxes).toHaveLength(todos.size + 1);

        expect(getByLabelText(todo)).toBeTruthy();
      });
    });

    describe('and a user wants to see only active tasks', () => {
      it('only shows active tasks', () => {
        const { getAllByRole, getByLabelText, queryByLabelText } = render(
          <Todos todos={todos} />
        );

        //find radio button for active
        const activeButton = getByLabelText('active');
        fireEvent.click(activeButton);

        const tasks = getAllByRole('checkbox');
        expect(tasks.every(task => task.checked)).toBe(true);
      });

      it('only shows completed tasks', () => {
        const { getAllByRole, getByLabelText, queryByLabelText } = render(
          <Todos todos={todos} />
        );

        //find radio button for active
        const activeButton = getByLabelText('done');
        fireEvent.click(activeButton);

        const tasks = getAllByRole('checkbox');
        expect(tasks.every(task => task.checked)).toBe(false);
      });
    });
  });

  describe('when a user chooses to remove a task', () => {
    it('no longer displays the task', () => {
      const { getByLabelText, queryByLabelText } = render(
        <Todos todos={todos} />
      );

      // how to do this less brittly, aside from using a 'testId'
      fireEvent.click(getByLabelText('bar').nextSibling);
      expect(queryByLabelText('bar')).toBeNull();
    });
  });
});
