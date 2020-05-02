import React, { lazy, Suspense } from 'react';

const LazyKardex = lazy(() => import('./Kardex'));

const Kardex = props => (
  <Suspense fallback={null}>
    <LazyKardex {...props} />
  </Suspense>
);

export default Kardex;
