import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ProductCard from './ProductCard';

describe('<ProductCard />', () => {
  afterEach(cleanup);

  test('it should mount', () => {
    const { getByTestId } = render(<ProductCard />);
    const productCard = getByTestId('ProductCard');

    expect(productCard).toBeInTheDocument();
  });
});