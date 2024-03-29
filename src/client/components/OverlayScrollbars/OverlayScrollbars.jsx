import {
  memo, useCallback, useRef, useEffect, forwardRef, useImperativeHandle,
} from 'react';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import throttle from 'lodash/throttle';
import debounce from 'lodash/debounce';
import { overlayScrollbarConfig as options } from '@client/configs/overlayScrollbarConfig';
import { childrenPropTypes } from '@client/prop-types/childrenPropTypes';

const OverlayScrollbars = memo(forwardRef(({
  children,
}, ref) => {
  const scrollbarRef = useRef(null);

  const updateScrollbar = useCallback(() => {
    if (scrollbarRef?.current) {
      scrollbarRef?.current.osInstance().update();
    }
  }, [scrollbarRef]);

  useImperativeHandle(ref, () => scrollbarRef.current, []);

  useEffect(() => {
    const throttledUpdateScrollbar = throttle(updateScrollbar, 50);
    const debouncedUpdateScrollbar = debounce(updateScrollbar, 50);

    window.addEventListener('resize', throttledUpdateScrollbar);
    window.addEventListener('resize', debouncedUpdateScrollbar);

    return () => {
      window.removeEventListener('resize', throttledUpdateScrollbar);
      window.removeEventListener('resize', debouncedUpdateScrollbar);
    };
  }, [updateScrollbar]);

  return (
    <OverlayScrollbarsComponent
      ref={scrollbarRef}
      options={options}
    >
      {children}
    </OverlayScrollbarsComponent>
  );
}));

OverlayScrollbars.displayName = 'OverlayScrollbars';

OverlayScrollbars.propTypes = {
  children: childrenPropTypes.props,
};

OverlayScrollbars.defaultProps = {
  children: childrenPropTypes.default,
};

export default OverlayScrollbars;
