import { useCallback, useEffect, useState } from 'react';
import { useRouter } from '@client/router/hooks';
import { useNavigation } from '@client/store/navigation';
import { useMatchMediaContext } from '@client/contexts/MatchMediaContext';

export const useNav = ({ openNavButtonRef, closeNavButtonRef }) => {
  const { isDesktop } = useMatchMediaContext();

  const [isVisible, setIsVisible] = useState(isDesktop);

  const { location: { path } } = useRouter();
  const {
    mainNav: {
      isOpen, isAnimated,
      actions: { toggleNav, closeNav },
    },
    dropdownNav: {
      actions: {
        toggleNav: toggleDropdownNav,
        closeNav: closeDropdownNav,
      },
    },
  } = useNavigation();

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
