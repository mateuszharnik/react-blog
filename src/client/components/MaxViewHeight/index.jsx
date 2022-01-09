import React, {
  useEffect, useState, useMemo, useCallback, memo,
} from 'react';
import {
  oneOfType, arrayOf, node, string, number,
} from 'prop-types';
import getWindowInnerHeight from '@client/helpers/getWindowInnerHeight';

const MaxViewHeight = memo(({ children, offsetHeight, classList }) => {
  const [height, setHeight] = useState(getWindowInnerHeight(offsetHeight));

  const className = useMemo(() => `max-vh-100 ${classList}`.trim(), [classList]);

  const setHeightOnResize = useCallback(() => {
    const innerHeight = getWindowInnerHeight(offsetHeight);

    setHeight(innerHeight);
  }, [offsetHeight]);

  useEffect(() => {
    window.addEventListener('resize', setHeightOnResize);

    return () => {
      window.removeEventListener('resize', setHeightOnResize);
    };
  }, [setHeightOnResize]);

  return (
    <div className={className} style={{ height: `${height}px` }}>
      {children}
    </div>
  );
});

MaxViewHeight.propTypes = {
  children: oneOfType([arrayOf(node), node]).isRequired,
  offsetHeight: number,
  classList: string,
};

MaxViewHeight.defaultProps = {
  offsetHeight: 0,
  classList: '',
};

export default MaxViewHeight;
