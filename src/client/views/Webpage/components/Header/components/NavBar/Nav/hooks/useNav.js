import { useCallback, useEffect, useState } from 'react';
import { useRouter } from '@client/router/hooks';
import { usePageSizeContext } from '@client/contexts/PageSizeContext';
import { useWebpageNavigationContext } from '@client/views/Webpage/contexts/WebpageNavigationContext';

export const useNav = ({ openNavButtonRef, closeNavButtonRef }) => {
  const { isDesktop } = usePageSizeContext();
  const {
    isOpen,
    isAnimated,
    toggleMainNav: toggleNav,
    closeMainNav: closeNav,
    toggleDropdownNav,
    closeDropdownNav,
  } = useWebpageNavigationContext();

  const [isVisible, setIsVisible] = useState(isDesktop);

  const { location: { path } } = useRouter();

  const handleCloseNavOnBlur = useCallback((e) => {
    if (!e?.relatedTarget || isDesktop) return;

    if (!e?.relatedTarget?.getAttribute('data-nav') && isOpen) toggleNav(false);
  }, [isDesktop, isOpen]);

  const setFocus = useCallback((navOpen = false) => {
    setTimeout(() => {
      const element = navOpen ? closeNavButtonRef.current : openNavButtonRef.current;

      if (element) element.focus();
    }, 0);
  }, [closeNavButtonRef, openNavButtonRef]);

  const handleCloseNav = useCallback(() => {
    toggleNav(false);

    setFocus(false);
  }, [setFocus]);

  const handleOpenNav = useCallback(() => {
    setIsVisible(true);

    setTimeout(() => {
      toggleNav(true);

      setFocus(true);
      setIsVisible(false);
    }, 50);
  }, [setFocus]);

  useEffect(() => {
    toggleNav(false);
    toggleDropdownNav(false);
  }, [path]);

  useEffect(() => {
    if (isDesktop) closeNav();
    if (!isDesktop) closeDropdownNav();
  }, [isDesktop]);

  useEffect(() => () => {
    toggleNav(false);
    toggleDropdownNav(false);
    document.body.classList.remove('overflow-hidden');
  }, []);

  useEffect(() => {
    if ((isOpen && !isDesktop)) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [isDesktop, isOpen]);

  return {
    isOpen,
    isAnimated,
    isVisible,
    actions: {
      handleOpenNav,
      handleCloseNav,
      handleCloseNavOnBlur,
    },
  };
};
