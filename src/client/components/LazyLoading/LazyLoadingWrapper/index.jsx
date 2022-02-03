import React, { memo, useMemo } from 'react';
import {
  oneOfType, arrayOf, node, bool,
} from 'prop-types';
import MaxViewHeight from '@client/components/MaxViewHeight';

const LazyLoadingWrapper = memo(({ children, page }) => {
  const className = useMemo(
    () => `lazy-loading-wrapper position-relative bg-white${
      page ? '' : ' lazy-loading-wrapper__component'
    }`,
    [page],
  );

  return (
    <MaxViewHeight className={className}>
      <div className="position-center w-100">
        {children}
      </div>
    </MaxViewHeight>
  );
});

LazyLoadingWrapper.displayName = 'LazyLoadingWrapper';

LazyLoadingWrapper.propTypes = {
  children: oneOfType([arrayOf(node), node]),
  page: bool,
};

LazyLoadingWrapper.defaultProps = {
  children: null,
  page: false,
};

export default LazyLoadingWrapper;
