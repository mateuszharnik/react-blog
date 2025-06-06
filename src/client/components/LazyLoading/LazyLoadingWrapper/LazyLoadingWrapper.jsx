import { lazyLoadingWrapperPropTypes } from '@client/prop-types/lazyLoadingWrapperPropTypes';
import MaxViewHeight from '@client/components/MaxViewHeight';
import Box from '@client/components/Box';
import { getMaxViewHeightClassName } from './LazyLoadingWrapper.classes';

const LazyLoadingWrapper = ({
  children, className, offsetTop, ...restProps
}) => {
  const maxViewHeightClassName = getMaxViewHeightClassName({ className });

  return (
    <MaxViewHeight
      offsetHeight={offsetTop}
      className={maxViewHeightClassName}
    >
      <Box
        className="position-center w-100"
        {...restProps}
      >
        {children}
      </Box>
    </MaxViewHeight>
  );
};

LazyLoadingWrapper.displayName = 'LazyLoadingWrapper';

LazyLoadingWrapper.propTypes = lazyLoadingWrapperPropTypes.props;

LazyLoadingWrapper.defaultProps = lazyLoadingWrapperPropTypes.default;

export default LazyLoadingWrapper;
