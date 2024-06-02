import { useSafeContext } from '@client/hooks/useSafeContext';
import { Context as ThemeContext } from '../../ThemeContext';

export const useThemeContext = () => {
  const {
    theme,
    toggleTheme,
    setTheme,
  } = useSafeContext({ context: ThemeContext });

  return {
    theme,
    toggleTheme,
    setTheme,
  };
};
