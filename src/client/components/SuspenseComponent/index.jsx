import React, { memo, Suspense } from 'react';
import PropTypes from 'prop-types';

const SuspenseComponent = memo(({ children }) => (
  <Suspense fallback={<div>Loading...</div>}>
    {children}
  </Suspense>
));

SuspenseComponent.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SuspenseComponent;
