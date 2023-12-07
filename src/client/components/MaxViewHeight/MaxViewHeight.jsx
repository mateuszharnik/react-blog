import {
  memo, useEffect, useState, useMemo, useCallback, forwardRef,
} from 'react';
import { getWindowInnerHeight } from '@client/utils/sizesUtils';
import { maxViewHeightPropTypes } from '@client/prop-types/maxViewHeightPropTypes';
import Box from '@client/components/Box';
import { getDivClassName } from './MaxViewHeight.classes';

const MaxViewHeight = memo(forwardRef(({
  offsetHeight,
  className,
  children,
  ...restProps
}, maxViewHeightRef) => {
  const [height, setHeight] = useState(getWindowInnerHeight(offsetHeight));

  const divClassName = useMemo(() => getDivClassName({ className }), [className]);

  const divStyles = useMemo(() => ({
    height: `${height}px`,
    ...(offsetHeight && { maxHeight: `calc(100vh - ${offsetHeight}px` }),
  }), [height, offsetHeight]);

  const setHeightOnResize = useCallback(() => {
    const innerHeight = getWindowInnerHeight(offsetHeight);

    if (innerHeight !== height) {
      setHeight(innerHeight);
    }
  }, [offsetHeight, height]);

  useEffect(() => {
    window.addEventListener('resize', setHeightOnResize);

    return () => {
      window.removeEventListener('resize', setHeightOnResize);
    };
  }, [setHeightOnResize]);

  return (
    <Box
      ref={maxViewHeightRef}
      className={divClassName}
      style={divStyles}
      {...restProps}
    >
      {children}
    </Box>
  );
}));

MaxViewHeight.displayName = 'MaxViewHeight';

MaxViewHeight.propTypes = maxViewHeightPropTypes.props;

MaxViewHeight.defaultProps = maxViewHeightPropTypes.default;

export default MaxViewHeight;
