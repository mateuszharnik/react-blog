import {
  memo, useEffect, useState, useMemo, useCallback,
} from 'react';
import { getWindowInnerHeight } from '@client/utils/sizesUtils';
import { maxViewHeightPropTypes, maxViewHeightDefaultProps } from '@client/prop-types';

const MaxViewHeight = memo(({ offsetHeight, maxViewHeightClassName, children }) => {
  const [height, setHeight] = useState(getWindowInnerHeight(offsetHeight));

  const divClassName = useMemo(() => `max-vh-100 ${maxViewHeightClassName}`.trim(), [maxViewHeightClassName]);

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
    <div
      className={divClassName}
      style={divStyles}
    >
      {children}
    </div>
  );
});

MaxViewHeight.displayName = 'MaxViewHeight';

MaxViewHeight.propTypes = maxViewHeightPropTypes;

MaxViewHeight.defaultProps = maxViewHeightDefaultProps;

export default MaxViewHeight;
