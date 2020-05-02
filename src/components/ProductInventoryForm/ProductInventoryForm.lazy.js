import React, { lazy, Suspense } from 'react';

const LazyProductInventoryForm = lazy(() => import('./ProductInventoryForm'));

const ProductInventoryForm = props => (
  <Suspense fallback={null}>
    <LazyProductInventoryForm {...props} />
  </Suspense>
);

export default ProductInventoryForm;
