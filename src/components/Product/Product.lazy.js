import React, { lazy, Suspense } from 'react';

const LazyProduct = lazy(() => import('./Product'));

const Product = props => (
  <Suspense fallback={null}>
    <LazyProduct {...props} />
  </Suspense>
);

export default Product;
