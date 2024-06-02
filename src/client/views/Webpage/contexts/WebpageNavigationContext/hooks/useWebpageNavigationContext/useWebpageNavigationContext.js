import { useSafeContext } from '@client/hooks/useSafeContext';
import { Context as WebpageNavigationContext } from '../../WebpageNavigationContext';

export const useWebpageNavigationContext = () => {
  const {
    isOpen,
    isAnimated,
    isDropdownOpen,
    isDropdownAnimated,
    toggleMainNav,
    closeMainNav,
    toggleDropdownNav,
    closeDropdownNav,
  } = useSafeContext({ context: WebpageNavigationContext });

  return {
    isOpen,
    isAnimated,
    isDropdownOpen,
    isDropdownAnimated,
    toggleMainNav,
    closeMainNav,
    toggleDropdownNav,
    closeDropdownNav,
  };
};
