import React, {
  useEffect, useState, useCallback, memo,
} from 'react';
import PropTypes from 'prop-types';
import getWindowInnerHeight from '@client/helpers/getWindowInnerHeight';

const MaxViewHeight = memo(({ children, offsetHeight, classList }) => {
  const [height, setHeight] = useState(getWindowInnerHeight(offsetHeight));

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
    <div className={classList} style={{ height: `${height}px` }}>
      {children}
    </div>
  );
});

MaxViewHeight.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  offsetHeight: PropTypes.number,
  classList: PropTypes.string,
};

MaxViewHeight.defaultProps = {
  offsetHeight: 0,
  classList: '',
};

export default MaxViewHeight;
