import { useContext } from 'react';
import { Context as ThemeContext } from '../../ThemeContext';

export const useThemeContext = () => {
  const {
    theme,
    toggleTheme,
    setTheme,
  } = useContext(ThemeContext);

  return {
    theme,
    toggleTheme,
    setTheme,
  };
};
