import React, {
  useEffect, useState, useMemo, useCallback, memo,
} from 'react';
import {
  oneOfType, arrayOf, node, string, number,
} from 'prop-types';
import getWindowInnerHeight from '@client/helpers/getWindowInnerHeight';

const MaxViewHeight = memo(({ children, offsetHeight, className }) => {
  const [height, setHeight] = useState(getWindowInnerHeight(offsetHeight));

  const classNames = useMemo(() => `max-vh-100 ${className}`.trim(), [className]);

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
      className={classNames}
      style={{ height: `${height}px` }}
    >
      {children}
    </div>
  );
});

MaxViewHeight.displayName = 'MaxViewHeight';

MaxViewHeight.propTypes = {
  children: oneOfType([arrayOf(node), node]),
  offsetHeight: number,
  className: string,
};

MaxViewHeight.defaultProps = {
  children: null,
  offsetHeight: 0,
  className: '',
};

export default MaxViewHeight;
