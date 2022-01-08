import React, { memo } from 'react';
import PropTypes from 'prop-types';
import MaxViewHeight from '@client/components/MaxViewHeight';

const LazyComponentWrapper = memo(({ children }) => (
  <MaxViewHeight classList="position-relative bg-white">
    <div className="position-center w-100">
      {children}
    </div>
  </MaxViewHeight>
));

LazyComponentWrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default LazyComponentWrapper;
