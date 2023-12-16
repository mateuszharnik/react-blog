import {
  memo, createContext, useMemo, useRef, useState, useCallback, useEffect,
} from 'react';
import { childrenPropTypes } from '@client/prop-types/childrenPropTypes';

export const Context = createContext();

const WebpageNavigationContext = memo(({ children }) => {
  const isComponentUnmounted = useRef(false);

  const [isOpen, setIsOpen] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);
  const isAnimatedRef = useRef(isAnimated);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownAnimated, setIsDropdownAnimated] = useState(false);
  const isDropdownAnimatedRef = useRef(isDropdownAnimated);

  const toggleMainNav = useCallback((value) => {
    if (isComponentUnmounted.current) return;

    if (!isAnimatedRef.current) {
      isAnimatedRef.current = true;
      setIsAnimated(isAnimatedRef.current);

      if (value !== undefined) {
        setIsOpen(value);
      } else {
        setIsOpen((state) => !state);
      }

      setTimeout(() => {
        if (isAnimatedRef.current) {
          isAnimatedRef.current = false;
          setIsAnimated(isAnimatedRef.current);
        }
      }, 350);
    }
  }, [isAnimatedRef]);

  const closeMainNav = useCallback(() => {
    if (isComponentUnmounted.current) return;

    if (isOpen) setIsOpen(false);
  }, [isOpen]);

  const toggleDropdownNav = useCallback((value) => {
    if (isComponentUnmounted.current) return;

    if (!isDropdownAnimatedRef.current) {
      isDropdownAnimatedRef.current = true;
      setIsDropdownAnimated(isDropdownAnimatedRef.current);

      if (value !== undefined) {
        setIsDropdownOpen(value);
      } else {
        setIsDropdownOpen((state) => !state);
      }

      setTimeout(() => {
        if (isDropdownAnimatedRef.current) {
          isDropdownAnimatedRef.current = false;
          setIsDropdownAnimated(isDropdownAnimatedRef.current);
        }
      }, 200);
    }
  }, [isDropdownAnimatedRef]);

  const closeDropdownNav = useCallback(() => {
    if (isComponentUnmounted.current) return;

    if (isDropdownOpen) setIsDropdownOpen(false);
  }, [isDropdownOpen]);

  useEffect(() => () => {
    isComponentUnmounted.current = true;
  }, []);

  const context = useMemo(() => ({
    isOpen,
    isAnimated,
    isDropdownOpen,
    isDropdownAnimated,
    toggleMainNav,
    closeMainNav,
    toggleDropdownNav,
    closeDropdownNav,
  }), [
    isOpen,
    isAnimated,
    isDropdownOpen,
    isDropdownAnimated,
    toggleMainNav,
    closeMainNav,
    toggleDropdownNav,
    closeDropdownNav,
  ]);

  return (
    <Context.Provider value={context}>
      {children}
    </Context.Provider>
  );
});

WebpageNavigationContext.displayName = 'WebpageNavigationContext';

WebpageNavigationContext.propTypes = {
  children: childrenPropTypes.props,
};

WebpageNavigationContext.defaultProps = {
  children: childrenPropTypes.default,
};

export default WebpageNavigationContext;
