import { useContext } from 'react';
import { Context } from '../ThemeContext';

export const useThemeContext = () => {
  const {
    theme,
    toggleTheme,
    setTheme,
  } = useContext(Context);

  return {
    theme,
    toggleTheme,
    setTheme,
  };
};
