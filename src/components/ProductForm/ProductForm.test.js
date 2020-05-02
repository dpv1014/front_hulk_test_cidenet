import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ProductForm from './ProductForm';

describe('<ProductForm />', () => {
  afterEach(cleanup);

  test('it should mount', () => {
    const { getByTestId } = render(<ProductForm />);
    const productForm = getByTestId('ProductForm');

    expect(productForm).toBeInTheDocument();
  });
});