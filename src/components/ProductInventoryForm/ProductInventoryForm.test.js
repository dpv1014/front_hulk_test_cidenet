import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ProductInventoryForm from './ProductInventoryForm';

describe('<ProductInventoryForm />', () => {
  afterEach(cleanup);

  test('it should mount', () => {
    const { getByTestId } = render(<ProductInventoryForm />);
    const productInventoryForm = getByTestId('ProductInventoryForm');

    expect(productInventoryForm).toBeInTheDocument();
  });
});