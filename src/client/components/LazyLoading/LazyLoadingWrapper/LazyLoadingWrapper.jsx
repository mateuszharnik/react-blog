import { memo, useMemo } from 'react';
import { lazyLoadingWrapperPropTypes, lazyLoadingWrapperDefaultProps } from '@client/prop-types';
import MaxViewHeight from '@client/components/MaxViewHeight';

const LazyLoadingWrapper = memo(({ children, wrapperClassName, offsetTop }) => {
  const maxViewHeightClassName = useMemo(
    () => `lazy-loading-wrapper position-relative${wrapperClassName ? ` ${wrapperClassName}` : ''}`,
    [wrapperClassName],
  );

  return (
    <MaxViewHeight
      offsetHeight={offsetTop}
      maxViewHeightClassName={maxViewHeightClassName}
    >
      <div className="position-center w-100">
        {children}
      </div>
    </MaxViewHeight>
  );
});

LazyLoadingWrapper.displayName = 'LazyLoadingWrapper';

LazyLoadingWrapper.propTypes = lazyLoadingWrapperPropTypes;

LazyLoadingWrapper.defaultProps = lazyLoadingWrapperDefaultProps;

export default LazyLoadingWrapper;
