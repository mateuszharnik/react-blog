import React, { memo, useMemo } from 'react';
import {
  oneOfType, arrayOf, node, bool,
} from 'prop-types';
import MaxViewHeight from '@client/components/MaxViewHeight';

const LazyLoadingWrapper = memo(({ children, page }) => {
  const offsetHeight = useMemo(() => (page ? 0 : 84), [page]);

  const className = useMemo(
    () => `lazy-loading-wrapper position-relative bg-white${
      page ? '' : ' lazy-loading-wrapper__component'
    }`,
    [page],
  );

  return (
    <MaxViewHeight
      offsetHeight={offsetHeight}
      className={className}
    >
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
