import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Product from './Product';

describe('<Product />', () => {
  afterEach(cleanup);

  test('it should mount', () => {
    const { getByTestId } = render(<Product />);
    const product = getByTestId('Product');

    expect(product).toBeInTheDocument();
  });
});