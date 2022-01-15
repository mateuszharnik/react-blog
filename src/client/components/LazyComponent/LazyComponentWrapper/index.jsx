import React, { memo } from 'react';
import { oneOfType, arrayOf, node } from 'prop-types';
import MaxViewHeight from '@client/components/MaxViewHeight';

const LazyComponentWrapper = memo(({ children }) => (
  <MaxViewHeight classNames="position-relative bg-white">
    <div className="position-center w-100">
      {children}
    </div>
  </MaxViewHeight>
));

LazyComponentWrapper.displayName = 'LazyComponentWrapper';

LazyComponentWrapper.propTypes = {
  children: oneOfType([arrayOf(node), node]).isRequired,
};

export default LazyComponentWrapper;
