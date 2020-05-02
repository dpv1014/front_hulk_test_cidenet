import React, { lazy, Suspense } from 'react';

const LazyProductForm = lazy(() => import('./ProductForm'));

const ProductForm = props => (
  <Suspense fallback={null}>
    <LazyProductForm {...props} />
  </Suspense>
);

export default ProductForm;
