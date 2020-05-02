import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Store from './Store';

describe('<Store />', () => {
  afterEach(cleanup);

  test('it should mount', () => {
    const { getByTestId } = render(<Store />);
    const store = getByTestId('Store');

    expect(store).toBeInTheDocument();
  });
});