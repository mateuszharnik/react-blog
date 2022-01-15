import React, {
  useEffect, useState, useMemo, useCallback, memo,
} from 'react';
import {
  oneOfType, arrayOf, node, string, number,
} from 'prop-types';
import getWindowInnerHeight from '@client/helpers/getWindowInnerHeight';

const MaxViewHeight = memo(({ children, offsetHeight, classNames }) => {
  const [height, setHeight] = useState(getWindowInnerHeight(offsetHeight));

  const className = useMemo(() => `max-vh-100 ${classNames}`.trim(), [classNames]);

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
    <div className={className} style={{ height: `${height}px` }}>
      {children}
    </div>
  );
});

MaxViewHeight.displayName = 'MaxViewHeight';

MaxViewHeight.propTypes = {
  children: oneOfType([arrayOf(node), node]).isRequired,
  offsetHeight: number,
  classNames: string,
};

MaxViewHeight.defaultProps = {
  offsetHeight: 0,
  classNames: '',
};

export default MaxViewHeight;
