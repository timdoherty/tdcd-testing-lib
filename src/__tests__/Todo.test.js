import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Todo from '../Todo';

describe('Todo', () => {
  describe('given a task', () => {
    describe('when displayed', () => {
      it('shows the name of the task', () => {
        const todo = 'do it!';
        const { container } = render(<Todo todo={todo} />);
        expect(container).toHaveTextContent(todo);
      });

      it('shows the status of the task', () => {
        const { getByRole } = render(<Todo isComplete={true} />);
        const checkbox = getByRole('checkbox');
        expect(checkbox).toBeChecked();
      });
    });

    describe('when a user toggles the task status', () => {
      it('responds with the name of the task', () => {
        const todo = 'todoit';
        const onCompletedToggled = jest.fn();
        const { getByRole } = render(
          <Todo todo={todo} onCompletedToggled={onCompletedToggled} />
        );
        const checkbox = getByRole('checkbox');
        fireEvent.click(checkbox);
        expect(onCompletedToggled).toHaveBeenCalledWith(todo);
      });
    });

    describe('when a user deletes a task', () => {
      it('responds with the name of the deleted task', () => {
        const todo = 'todoit';
        const onDeleted = jest.fn();
        const { getByRole } = render(
          <Todo todo={todo} onDeleted={onDeleted} />
        );
        const deleteButton = getByRole('button');
        fireEvent.click(deleteButton);
        expect(onDeleted).toHaveBeenCalledWith(todo);
      });
    });
  });
});
