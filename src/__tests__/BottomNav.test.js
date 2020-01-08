import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import BottomNav from '../BottomNav';

describe('BottomNav', () => {
  const options = ['foo', 'bar', 'baz'];

  describe('given a list of navigation options', () => {
    describe('when displayed', () => {
      it('shows each option', () => {
        const { getAllByRole } = render(<BottomNav options={options} />);
        const radios = getAllByRole('radio');

        expect(radios).toHaveLength(options.length);
      });

      describe('and an option is already chosen', () => {
        it('selects the chosen option', () => {
          const { getByLabelText, debug } = render(
            <BottomNav options={options} selected="bar" />
          );
          debug();
          const barOption = getByLabelText('bar');
          expect(barOption).toBeChecked();
        });
      });
    });

    describe('when a user chooses a nagivation option', () => {
      it('responds with the option name', () => {
        const onNavigationChanged = jest.fn();
        const { getByLabelText } = render(
          <BottomNav
            options={options}
            onNavigationChanged={onNavigationChanged}
          />
        );
        const fooOption = getByLabelText('foo');
        fireEvent.click(fooOption);

        expect(onNavigationChanged).toHaveBeenCalledWith('foo');
      });
    });
  });
});
