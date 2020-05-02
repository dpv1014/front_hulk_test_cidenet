import React, { lazy, Suspense } from 'react';

const LazyStore = lazy(() => import('./Store'));

const Store = props => (
  <Suspense fallback={null}>
    <LazyStore {...props} />
  </Suspense>
);

export default Store;
