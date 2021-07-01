import { createContext, useContext, useEffect, useState } from 'react';
import { lightTheme, darkTheme } from '../../utils/theme';
import { ThemeProvider, ThemeOptions } from '@material-ui/core/styles';

const ThemeContext = createContext({ theme: lightTheme, toggleTheme: () => {} });
export const useTheme = () => useContext(ThemeContext);

export const DashboardThemeProvider = (props: any) => {
  const [theme, setTheme] = useState(lightTheme);

  const changeTheme = (theme: ThemeOptions) => {
    setTheme(theme);
    window.localStorage.setItem('theme', theme === lightTheme ? 'light' : 'dark');
  };

  const toggleTheme = () => {
    if (theme === lightTheme) changeTheme(darkTheme);
    else changeTheme(lightTheme);
  };

  useEffect(() => {
    const theme = window.localStorage.getItem('theme');
    changeTheme(theme === 'light' ? lightTheme : darkTheme);
  });

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
