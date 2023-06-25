import { useMemo } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

export const useNavigation = () => {
  const { main, dropdown } = useStoreState((store) => store.navigationStore);

  const isMainNavAnimated = useMemo(() => main.isAnimated, [main]);
  const isMainNavOpen = useMemo(() => main.isOpen, [main]);

  const isDropdownNavAnimated = useMemo(() => dropdown.isAnimated, [dropdown]);
  const isDropdownNavOpen = useMemo(() => dropdown.isOpen, [dropdown]);

  const {
    toggleMainNav,
    toggleDropdownNav,
    closeMainNav,
    closeDropdownNav,
    toggleState,
    setAnimated,
  } = useStoreActions((actions) => actions.navigationStore);

  return {
    mainNav: {
      isAnimated: isMainNavAnimated,
      isOpen: isMainNavOpen,
      actions: {
        toggleNav: toggleMainNav,
        closeNav: closeMainNav,
      },
    },
    dropdownNav: {
      isAnimated: isDropdownNavAnimated,
      isOpen: isDropdownNavOpen,
      actions: {
        toggleNav: toggleDropdownNav,
        closeNav: closeDropdownNav,
      },
    },
    utils: {
      toggleState,
      setAnimated,
    },
  };
};
