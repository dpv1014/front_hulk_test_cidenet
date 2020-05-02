import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Kardex from './Kardex';

describe('<Kardex />', () => {
  afterEach(cleanup);

  test('it should mount', () => {
    const { getByTestId } = render(<Kardex />);
    const kardex = getByTestId('Kardex');

    expect(kardex).toBeInTheDocument();
  });
});