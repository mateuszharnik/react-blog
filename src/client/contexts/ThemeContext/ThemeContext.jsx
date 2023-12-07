import {
  memo, createContext, useMemo, useState, useCallback, useEffect,
} from 'react';
import { childrenPropTypes } from '@client/prop-types/childrenPropTypes';
import { valuesConstants } from '@shared/constants';

export const Context = createContext();

const ThemeContext = memo(({ children }) => {
  const [theme, setThemeValue] = useState(valuesConstants.THEME.LIGHT);

  const toggleTheme = useCallback(() => {
    const themeMode = theme === valuesConstants.THEME.DARK
      ? valuesConstants.THEME.LIGHT : valuesConstants.THEME.DARK;

    localStorage.setItem(valuesConstants.THEME.NAME, themeMode);
    document.documentElement.setAttribute(valuesConstants.THEME.DATA_BS, themeMode);

    setThemeValue(themeMode);
  }, [theme]);

  const setTheme = useCallback((payload) => {
    const themeMode = payload || valuesConstants.THEME.LIGHT;

    localStorage.setItem(valuesConstants.THEME.NAME, themeMode);
    document.documentElement.setAttribute(valuesConstants.THEME.DATA_BS, themeMode);

    setThemeValue(themeMode);
  }, []);

  const value = useMemo(() => ({
    theme,
    toggleTheme,
    setTheme,
  }), [theme, toggleTheme, setTheme]);

  useEffect(() => {
    setTheme(localStorage.getItem('theme'));
  }, []);

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
});

ThemeContext.displayName = 'ThemeContext';

ThemeContext.propTypes = {
  children: childrenPropTypes.props,
};

ThemeContext.defaultProps = {
  children: childrenPropTypes.default,
};

export default ThemeContext;
