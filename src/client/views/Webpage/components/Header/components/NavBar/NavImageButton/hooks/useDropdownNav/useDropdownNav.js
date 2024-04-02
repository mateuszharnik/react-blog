import { useCallback, useEffect } from 'react';
import { useWebpageNavigationContext } from '@client/views/Webpage/contexts/WebpageNavigationContext';

export const useDropdownNav = ({ buttonRef, dropdownRef }) => {
  const {
    isDropdownOpen: isOpen,
    isDropdownAnimated: isAnimated,
    toggleDropdownNav: toggleNav,
  } = useWebpageNavigationContext();

  const setFocus = useCallback(() => {
    setTimeout(() => {
      const element = buttonRef.current;

      if (element) element.focus();
    }, 200);
  }, [buttonRef]);

  const handleToggleNav = useCallback(() => {
    toggleNav();

    setFocus();
  }, [setFocus]);

  const handleCloseNavOnBlur = useCallback((e) => {
    if (!e?.relatedTarget) return;

    if (!e?.relatedTarget?.getAttribute('data-dropdown-nav') && isOpen) toggleNav(false);
  }, [isOpen]);

  const closeNavOnClick = useCallback((e) => {
    if (!dropdownRef.current || dropdownRef.current?.contains(e.target)) return;

    toggleNav(false);
  }, [dropdownRef]);

  useEffect(() => {
    document.addEventListener('click', closeNavOnClick);

    return () => {
      document.removeEventListener('click', closeNavOnClick);
    };
  }, [closeNavOnClick]);

  return {
    isOpen,
    isAnimated,
    actions: {
      handleToggleNav,
      handleCloseNavOnBlur,
    },
  };
};
